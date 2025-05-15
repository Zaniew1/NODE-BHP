
import { RequestHandler, Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/helpers/catchAsync';
import Database from '../../utils/Database/Database';

export const getCompanies: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
     const companies = await Database.company.findAll();
     res.status(200).json({success:{companies}})
});
export const getOneCompany: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
     const id = Number(req.params.id)
     const company = await Database.company.findOne({id});
     res.status(200).json({success:{company}})
});
export const createCompany: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const body = req.body
     const company = await Database.company.create(body);
     res.status(201).json({success:{company}})
});
export const updateCompany: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
     const id = Number(req.params.id);
     const body = req.body
     const company = await Database.company.update({id}, body);
     res.status(200).json({success:{company}})
});
export const deleteCompany: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const company = await Database.company.delete({id});
    res.status(200).json({success:{company}})
});
