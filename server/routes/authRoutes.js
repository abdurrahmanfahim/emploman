import { Router } from "express";
import { changePassword, login, session } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/session", session);
authRouter.post("/:id", changePassword);

export default authRouter;
