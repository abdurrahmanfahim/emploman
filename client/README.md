# TalentNode

A modern Employee Management System built with React and Vite. TalentNode provides a clean, role-based interface for managing workforce operations — from attendance tracking to payroll and leave management.

## Features

### Admin
- Dashboard with workforce overview and key metrics
- Employee directory management
- Leave request review and approval
- Payslip generation and management
- Account settings

### Employee
- Personal dashboard with attendance summary
- Attendance tracking and history
- Leave application and status tracking
- Payslip viewing and download
- Account settings

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Routing:** React Router v7
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Notifications:** Sonner

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # App shell and layout
│   ├── login/        # Login page components
│   ├── sidebar/      # Sidebar navigation
│   └── ui/           # shadcn/ui components
├── context/          # Auth context
├── features/         # Feature-specific data and components
├── pages/
│   ├── admin/        # Admin pages
│   └── employee/     # Employee pages
└── lib/              # Utilities
```

## Demo Credentials

| Role     | Email                  | Password |
|----------|------------------------|----------|
| Admin    | admin@example.com      | 123456   |
| Employee | johndoe@example.com    | 123456   |
