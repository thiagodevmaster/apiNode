import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import taskRouter from "./taskRouter.js";
import userRouter from "./useRoutes.js";

const router = Router();

// Define as rotas
router.use("/users", userRouter); 
router.use("/category", categoryRouter);
router.use("/task", taskRouter);

export default router;