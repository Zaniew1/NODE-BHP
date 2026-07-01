import { RequestHandler, Request, Response, NextFunction } from 'express';
import path from 'path';
import catchAsync from '../../utils/helpers/catchAsync';
import { Database } from '../../index';
import CompanyCreateSchema from '../zodSchemas/create.company';
import CompanyEditSchema from '../zodSchemas/edit.company';
import { Cache } from '../../utils/Cache/Cache';

const userId = 1;

export const getCompanies: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  let companies = await Cache.company.findMany(userId);
  if (companies === null) {
    companies = await Database.company.findMany({ author: userId });
    await Cache.company.setMany(userId, companies);
  }
  res.status(200).json({ success: { companies } });
});

export const getOneCompany: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const id = Number(req.params.id);
  let company = await Cache.company.findOne(userId, id);
  if (company === null) {
    company = await Database.company.findOne({ id: id });
    if (company) await Cache.company.create(userId, company);
  }
  res.status(200).json({ success: { company } });
});

export const createCompany: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const body = CompanyCreateSchema.parse(req.body);
  const author = 1;
  const company = await Database.company.create({
    author: author,
    name: body.name,
    nip: body.nip,
    regon: body.regon,
    pkd: body.pkd && body.pkd.length > 0 ? body.pkd.join(';') : undefined,
    postalCode: body.postalCode,
    city: body.city,
    street: body.street,
    phoneNumber: body.phoneNumber ? Number(body.phoneNumber) : undefined,
    email: body.email,
    notes: body.notes,
  });
  await Cache.company.create(userId, company);
  res.status(201).json({ success: { company } });
});

export const updateCompany: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const id = Number(req.params.id);
  const body = CompanyEditSchema.parse(req.body);
  const company = await Database.company.update(id, {
    name: body.name,
    nip: body.nip,
    regon: body.regon,
    pkd: body.pkd && body.pkd.length > 0 ? body.pkd.join(';') : undefined,
    postalCode: body.postalCode,
    city: body.city,
    street: body.street,
    phoneNumber: body.phoneNumber ? Number(body.phoneNumber) : undefined,
    email: body.email,
    notes: body.notes,
  });
  await Cache.company.update(userId, id, company);
  res.status(200).json({ success: { company } });
});

export const deleteCompany: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  // usuwa firmę i wszystkich pracowników powiązanych z tą firmą
  const id = Number(req.params.id);
  const company = await Database.company.delete(id);
  await Database.worker.deleteWorkersByCompanyId(id);
  await Cache.company.delete(userId, id);
  res.status(200).json({ success: { company } });
});

export const saveCompanyFile: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  res.send('Plik został wgrany pomyślnie');
});
export const getCompanyFile: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const filePath = res.locals.filePath as string;
  res.sendFile(path.resolve(filePath));
});
