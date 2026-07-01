import 'dotenv/config';
import { NODE_ENV } from './utils/constants/env';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import { startServer } from './config/server';
import { companyRouter } from './Company/router/company.route';
import workerRouter from './Workers/router/worker.route';
import authRouter from './Auth/router/auth.route';
import { DatabaseClass } from './utils/Database/Database';
const app = express();
export const Database = new DatabaseClass();

app.use(express.json());
app.use(morgan(NODE_ENV));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(cookieParser());

// const apiPath = `/api/${APP_VERSION}`;
const apiPath = ``;
app.use(`${apiPath}/auth`, authRouter);
app.use(`${apiPath}/company`, companyRouter);
app.use(`${apiPath}/worker`, workerRouter);

app.use(errorHandler);

startServer(app);

export default app;
