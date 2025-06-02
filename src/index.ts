import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import { NODE_ENV, APP_VERSION, APP_ORIGIN } from "./utils/constants/env";
import { startServer } from "./config/server";
import {companyRouter} from "./Company/router/company.route"
import workerRouter from "./Workers/router/worker.route";
import prisma from "./lib/prisma";
const app = express();

app.use(express.json());
app.use(morgan(NODE_ENV));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
// const apiPath = `/api/${APP_VERSION}`;
const apiPath = ``;
app.use(`${apiPath}/company`, companyRouter);
app.use(`${apiPath}/worker`, workerRouter);

app.use(errorHandler);

startServer(app);

export default app;
   