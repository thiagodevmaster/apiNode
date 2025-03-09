import { Router } from "express";
import { TaskController } from "../controllers/TasksController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { taskCreateValidation, taskUpdateValidation } from "../validators/taskValidation.js";

const taskRouter = Router();

taskRouter.get("/", authMiddleware, TaskController.getAll);
taskRouter.get("/:id", authMiddleware, TaskController.getTaskDetail);
taskRouter.post("/create", authMiddleware, taskCreateValidation, TaskController.createTask);
taskRouter.put("/update/:id", authMiddleware, taskUpdateValidation, TaskController.updateTask);
taskRouter.delete("/delete/:id", authMiddleware, TaskController.deleteTask);

export default taskRouter;