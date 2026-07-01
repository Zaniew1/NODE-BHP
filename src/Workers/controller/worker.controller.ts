import { RequestHandler, Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/helpers/catchAsync';
import appAssert from '../../utils/helpers/appAssert';
import { HttpErrors } from '../../utils/constants/http';
import { Database } from '../../index';
import WorkerCreateSchema from '../zodSchemas/create.worker';
import WorkerEditSchema from '../zodSchemas/edit.worker';
// import { thirtyDaysFromNow } from '../../utils/helpers/date';

export const getWorkers: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  // const author = Number(req.query.author);
  const workers = await Database.worker.findMany();
  res.status(200).json({ success: { workers } });
});
export const getOneWorker: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const id = Number(req.params.id);
  const worker = await Database.worker.findOne(id);
  res.status(200).json({ success: { worker } });
});
export const createWorker: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const body = WorkerCreateSchema.parse(req.body);
  if (body.companyId) {
    const company = await Database.worker.findOne(body.companyId);
    appAssert(company, HttpErrors.BAD_REQUEST, `Company with id ${body.companyId} does not exist`);
  }
  const worker = await Database.worker.create({
    ...body,
    pesel: body.pesel ? Number(body.pesel) : undefined,
    phoneNumber: body.phoneNumber ? Number(body.phoneNumber) : undefined,
  });
  res.status(201).json({ success: { worker } });
});
export const updateWorker: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const id = Number(req.params.id);
  const body = WorkerEditSchema.parse(req.body);
  const worker = await Database.worker.update(id, {
    ...body,
    pesel: body.pesel ? Number(body.pesel) : undefined,
    phoneNumber: body.phoneNumber ? Number(body.phoneNumber) : undefined,
  });
  res.status(200).json({ success: { worker } });
});
export const deleteWorker: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const id = Number(req.params.id);
  const worker = await Database.worker.delete(id);
  res.status(200).json({ success: { worker } });
});
export const saveWorkerFiles: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  console.log('123');
});
export const getWorkersWithDueTime: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  //   const workers = await Database.worker.findMany({
  //     $or: [
  //       { trainingEntry: { $gte: thirtyDaysFromNow() } },
  //       { trainingPeriodic: { $gte: thirtyDaysFromNow() } },
  //       { medicalExamination: { $gte: thirtyDaysFromNow() } },
  //     ],
  //   });
  //   res.status(200).json({ success: { workers } });
});
