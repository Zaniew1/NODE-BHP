
import { RequestHandler, Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/helpers/catchAsync';

export const registerHandler: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
 
});
