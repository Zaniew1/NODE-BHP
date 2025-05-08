import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import { NODE_ENV, APP_VERSION, APP_ORIGIN } from "./utils/constants/env";
import { startServer } from "./config/server";
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
const apiPath = `/api/${APP_VERSION}`;
// app.use(`${apiPath}/auth`, authRouter);


app.use(errorHandler);

startServer(app);

export default app;
   