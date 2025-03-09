import { body, param } from "express-validator";

export const taskCreateValidation = [
    body("title")
        .notEmpty()
        .withMessage("O título precisa ser fornecido")
        .isString()
        .withMessage("O título deve ser uma string")
        .isLength({ max: 100 })
        .withMessage("O título deve ter no máximo 100 caracteres"),

    body("description")
        .notEmpty()
        .withMessage("A descrição precisa ser fornecida")
        .isString()
        .withMessage("A descrição deve ser uma string")
        .isLength({ max: 500 })
        .withMessage("A descrição deve ter no máximo 500 caracteres"),

    body("dueDate")
        .notEmpty()
        .withMessage("A data de vencimento precisa ser fornecida")
        .isISO8601()
        .withMessage("A data de vencimento deve estar no formato ISO 8601 (ex: 2023-10-10T12:00:00.000Z)"),

    body("priority")
        .optional() 
        .isString()
        .withMessage("A prioridade deve ser uma string")
        .isIn(["baixa", "média", "alta"])
        .withMessage("A prioridade deve ser 'baixa', 'média' ou 'alta'"),

    body("status")
        .optional() 
        .isString()
        .withMessage("o status deve ser uma string")
        .isIn(["completa", "pendendte"])
        .withMessage("O status deve ser 'completa' ou 'pendente'"),

    body("category_id")
        .notEmpty()
        .withMessage("O ID da categoria precisa ser fornecido")
        .isInt({ min: 1 })
        .withMessage("O ID da categoria deve ser um número inteiro maior que 0"),
];

export const taskUpdateValidation = [
    body("title")
        .optional() 
        .notEmpty()
        .withMessage("O título não pode estar vazio")
        .isString()
        .withMessage("O título deve ser uma string")
        .isLength({ max: 100 })
        .withMessage("O título deve ter no máximo 100 caracteres"),

    body("description")
        .optional() 
        .notEmpty()
        .withMessage("A descrição não pode estar vazia")
        .isString()
        .withMessage("A descrição deve ser uma string")
        .isLength({ max: 500 })
        .withMessage("A descrição deve ter no máximo 500 caracteres"),

    body("dueDate")
        .optional() 
        .notEmpty()
        .withMessage("A data de vencimento não pode estar vazia")
        .isISO8601()
        .withMessage("A data de vencimento deve estar no formato ISO 8601 (ex: 2023-10-10T12:00:00.000Z)"),

    body("priority")
        .optional() 
        .notEmpty()
        .withMessage("A prioridade não pode estar vazia")
        .isString()
        .withMessage("A prioridade deve ser uma string")
        .isIn(["baixa", "média", "alta"])
        .withMessage("A prioridade deve ser 'baixa', 'média' ou 'alta'"),

    body("status")
        .optional() 
        .notEmpty()
        .withMessage("O status não pode estar vazio")
        .isString()
        .withMessage("O status deve ser uma string")
        .isIn(["completa", "pendente"])
        .withMessage("O status deve ser 'completa' ou 'pendente'"),

    body("category_id")
        .optional() 
        .notEmpty()
        .withMessage("O ID da categoria não pode estar vazio")
        .isInt({ min: 1 })
        .withMessage("O ID da categoria deve ser um número inteiro maior que 0"),
];

