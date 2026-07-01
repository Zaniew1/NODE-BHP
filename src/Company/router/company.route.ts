import express from 'express';
import * as companyController from '../controller/company.controller';
import { MulterHandler } from '../../middleware/uploadFile';
export const companyRouter = express.Router();

companyRouter.post('/', companyController.createCompany);
companyRouter.post('/:id/uploadFile', MulterHandler.uploadFile('company'), companyController.saveCompanyFile);
companyRouter.get('/:id/getFile/:name', MulterHandler.getFile('company'), companyController.getCompanyFile);
companyRouter.get('/', companyController.getCompanies);
companyRouter.get('/:id', companyController.getOneCompany);
companyRouter.delete('/:id', companyController.deleteCompany);
companyRouter.put('/:id', companyController.updateCompany);

export default companyRouter;
