// src/validators/userValidator.js
import { body } from "express-validator";

export const validateUser = [
    body("email")
        .isEmail()
        .withMessage("E-mail inválido")
        .normalizeEmail(), 

    body("password")
        .isLength({ min: 6 })
        .withMessage("A senha deve ter pelo menos 6 caracteres")
        .trim(),
];

