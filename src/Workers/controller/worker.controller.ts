
import { RequestHandler, Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/helpers/catchAsync';
import Database from '../../utils/Database/Database';


// export const getWorkers: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
//      const workers = await Database.worker.findMany();
//      res.status(200).json({success:{workers}})
// });
// export const getOneWorker: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
//      const id = Number(req.params.id)
//      const worker = await Database.worker.findOne({id});
//      res.status(200).json({success:{worker}})
// });
// export const createWorker: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
//     const body = req.body
//      const worker = await Database.worker.create(body);
//      res.status(201).json({success:{worker}})
// });
// export const updateWorker: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
//      const id = Number(req.params.id);
//      const body = req.body
//      const worker = await Database.worker.update(id, body);
//      res.status(200).json({success:{worker}})
// });
// export const deleteWorker: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
//     const id = Number(req.params.id);
//     const worker = await Database.worker.delete(id);
//     res.status(200).json({success:{worker}})
// });