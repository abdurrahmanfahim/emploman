import { Inngest } from "inngest";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";
import sendEmail from "../config/nodemailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "talent-node-server" });

// Auto checkout for employee
const autoCheckout = inngest.createFunction(
  {
    id: "auto-check-out",
    triggers: [{ event: "employee/check-out" }],
  },

  async ({ event, step }) => {
    const { employeeId, attendanceId } = event.data;

    // Wait for 9 hours
    await step.sleepUntil(
      "wait-for-9-hours",
      new Date(new Date().getTime() + 9 * 60 * 60 * 1000),
    );

    // Get attendance data
    let attendance = await Attendance.findById(attendanceId);

    if (!attendance?.checkOut) {
      // Get employee data
      const employee = await Employee.findById(employeeId);

      // Send reminder email
      await sendEmail({
        to: employee.email,
        subject: "Attendance check out reminder",
        body: `<div style="max-width: 600px;">
          <h2>Hi ${employee.firstName}</h2>,
          <p style="font-size: 16px;">You have a check-inr in ${employee.department} today :</p>
          <p style="font-size: 18px; font-weight: bold; color:
          #007bff; margin: 8px 0;">${attendance?.checkIn?.toLocaleTimeString()}</p>
          <p style="font-size: 16px;">Please make sure to
          check-out in one hour. </p>
          <p style="font-size: 16px;">If you have any questions,
          please contact your admin. </p>
          <br />
          <p style="font-size: 16px;">Best Regards, </p>
          <p style="font-size: 16px;">TalentNode</p>
        </div>`,
      });

      // After 10 hours, mark attendance as checked out with status "LATE"
      await step.sleepUntil(
        "wait-for-1-hours",
        new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
      );

      attendance = await Attendance.findById(attendanceId);

      if (!attendance?.checkOut) {
        attendance.checkOut =
          new Date(attendance.checkIn).getTime() + 4 * 60 * 60 * 1000;
        attendance.workingHours = 4;
        attendance.dayType = "Half Day";
        attendance.status = "LATE";
        await attendance.save();
      }
    }
  },
);

// Send Email to admin, If admin doesn't take action on leave application within 24 hours.
const leaveApplicationReminder = inngest.createFunction(
  {
    id: "leave-application-reminder",
    triggers: [{ event: "leave/pending" }],
  },
  async ({ event, step }) => {
    const { leaveApplicationId } = event.data;

    // Wait for 24 hours
    await step.sleep("wait-for-24-hours", "24h");

    const leaveApplication =
      await LeaveApplication.findById(leaveApplicationId);
    if (!leaveApplication) return;

    if (leaveApplication.status === "PENDING") {
      const employee = await Employee.findById(leaveApplication.employeeId);
      if (!employee) return;

      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "Pending Leave Application Reminder",
        body: `<div style="max-width: 600px;">
          <h2>Hi Admin,</h2>
          <p style="font-size: 16px;">You have a leave application in
          ${employee.department} today :</p>
          <p style="font-size: 18px; font-weight: bold; color:
          #007bff; margin: 8px 0;">
          ${leaveApplication?.startDate?.toLocaleDateString()}
          </p>
          <p style="font-size: 16px;">Please make sure to take action
          on this leave application.</p>
          <br />
          <p style="font-size: 16px;">Best Regards,</p>
          <p style="font-size: 16px;">TalentNode</p>
        </div>`,
      });
    }
  },
);

// Cron: Check attendance at 11:30 AM IST (06:00 UTC) and email absent employees
const attendanceReminderCron = inngest.createFunction(
  { id: "attendance-reminder-cron", triggers: [{ cron: "0 6 * * *" }] }, // 06:00 UTC = 11:30 AM IST

  async ({ step }) => {
    // Step 1: Get today's date range (UTC)
    const today = await step.run("get-today-date", () => {
      const now = new Date();
      const startUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
      const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);
      return { startUTC: startUTC.toISOString(), endUTC: endUTC.toISOString() };
    });

    // Step 2: Get all active, non-deleted employees
    const activeEmployees = await step.run("get-active-employees", async () => {
      const employees = await Employee.find({
        isDeleted: false,
        employmentStatus: "ACTIVE",
      }).lean();
      return employees.map((emp) => ({
        _id: emp._id.toString(),
        firstName: emp.firstName,
        lastName: emp.lastName,
        email: emp.email,
        department: emp.department,
      }));
    });

    // Step 3: Get employee ID's on approved leave today
    const onLeaveIds = await step.run("get-on-leave-ids", async () => {
      const leaves = await LeaveApplication.find({
        status: "APPROVED",
        startDate: { $lte: today.endUTC },
        endDate: { $gte: today.startUTC },
      }).lean();
      return leaves.map((leave) => leave.employeeId.toString());
    });

    // Step 4: Get employee ID's who have checked in today
    const checkedInIds = await step.run("get-checked-in-ids", async () => {
      const attendances = await Attendance.find({
        date: { $gte: new Date(today.startUTC), $lt: new Date(today.endUTC) },
      }).lean();
      return attendances.map((att) => att.employeeId.toString());
    });

    // Step 5: Find absent employees (active, not on leave, didn't check in)
    const absentEmployees = activeEmployees.filter(
      (emp) => !onLeaveIds.includes(emp._id) && !checkedInIds.includes(emp._id),
    );

    // Step 6: Send email to absent employees
    if (absentEmployees.length > 0) {
      // Send email to absent employees
      await step.run("send-reminder-emails", async () => {
        await Promise.all(absentEmployees.map((emp) =>
          sendEmail({
            to: emp.email,
            subject: "Attendance Reminder",
            body: `<div style="max-width: 600px; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2>Dear ${emp.firstName},</h2>
              <p>You have been marked as <strong>absent</strong> today in the <strong>${emp.department}</strong> department.</p>
              <p>If this is incorrect, please contact your administrator.</p>
              <br />
              <p>Best Regards,<br/>TalentNode Team</p>
            </div>`,
          })
        ));
      });
    }
    return {
      totalActive: activeEmployees.length,
      onLeave: onLeaveIds.length,
      checkIn: checkedInIds.length,
      absent: absentEmployees.length,
    };
  },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
  autoCheckout,
  leaveApplicationReminder,
  attendanceReminderCron,
];
