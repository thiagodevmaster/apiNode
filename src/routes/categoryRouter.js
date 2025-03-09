import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { validateCategory } from "../validators/categoryValidation.js";

const categoryRouter = Router();

categoryRouter.get("/", authMiddleware, CategoryController.getAll);
categoryRouter.post("/", authMiddleware, validateCategory, CategoryController.createCategory);
categoryRouter.get("/:id", authMiddleware, CategoryController.getById);

export default categoryRouter;