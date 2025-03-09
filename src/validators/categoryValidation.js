import { body } from "express-validator";

export const validateCategory = [
    body("name")
        .notEmpty()
        .withMessage("O nome precisa ser fornecido"),
]
