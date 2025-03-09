import { Router } from "express";
import UserController from "../controllers/UsersController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { validateUser } from "../validators/userValidator.js";

const userRouter = Router();

// Rotas de usuários
userRouter.get("/", UserController.getAllUsers); 
userRouter.get("/tasks", authMiddleware, UserController.getTasks); 
userRouter.post("/", validateUser, UserController.createUser);
userRouter.post("/login", UserController.login) 

export default userRouter;