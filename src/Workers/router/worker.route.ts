import express from "express";
import * as workerController from "../controller/worker.controller";
export const workerRouter = express.Router();

workerRouter.get("/dueTime", workerController.getWorkersWithDueTime);
workerRouter.get("/", workerController.getWorkers);
workerRouter.post("/", workerController.createWorker);
workerRouter.get("/:id", workerController.getOneWorker);
workerRouter.delete("/:id", workerController.deleteWorker);
workerRouter.put("/:id", workerController.updateWorker);


export default workerRouter;
