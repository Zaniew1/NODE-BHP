import express from "express";
import * as AuthController from "../controller/company.controller";
export const authRouter = express.Router();

authRouter.post("/register", AuthController.registerHandler);


export default authRouter;
