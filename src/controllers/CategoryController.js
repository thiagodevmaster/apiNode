import { validationResult } from "express-validator";
import { categoryRepository } from "../repositories/categoryRepository.js";


export const CategoryController = {
    async getAll(req, resp) {
        try{
            const id = req.userId;
            const result = await categoryRepository.findAll(id);
            return resp.status(200).json(result)
        } catch (error) {
            return resp.status(401).json({ error: "Erro ao buscar categorias" })
        }
    },

    async getById(req, resp) {
        try{
            const id = parseInt(req.params.id);
            const result = await categoryRepository.getCategoryById(id);

            if(!result){
                return resp.status(206).json({message: "não encontrado"});
            }

            return resp.status(200).json(result);
        }catch (error) {
            return resp.status(401).json({ error: "Erro ao buscar categoria" })
        }
    },

    async createCategory(req, resp) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return resp.status(400).json({ error: errors.array() });
        }

        try{
            const id = req.userId;
            const result = await categoryRepository.create(req.body, id)
            return resp.status(201).json(req.body);
        }catch(error) {
            return resp.status(401).json({error: error});
        }
    }
}