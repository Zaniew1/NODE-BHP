import express from "express";
import * as companyController from "../controller/company.controller";
export const companyRouter = express.Router();

companyRouter.post("/", companyController.createCompany);
companyRouter.get("/", companyController.getCompanies);
companyRouter.get("/:id", companyController.getOneCompany);
companyRouter.delete("/:id", companyController.deleteCompany);
companyRouter.put("/:id", companyController.updateCompany);


export default companyRouter;
