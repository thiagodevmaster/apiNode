import { validationResult } from "express-validator";
import { taskRepository } from "../repositories/taskRepository.js";

export const TaskController = {
    async getAll(req, resp){
        try{
            const id = req.userId;
            const result = await taskRepository.tasksByUser(id);
            return resp.status(200).json(result)
        }catch(error) {
            return resp.status(401).json(error)
        }
    },

    async createTask(req, resp) {
        
        const errors = validationResult(req.body);
        if(!errors.isEmpty()) {
            return resp.status(401).json({ error: errors.array() });
        }

        try{
            const id = req.userId;
            const result = await taskRepository.create(req.body, id);
            return resp.status(200).json(result)
        }catch(error) {
            return resp.status(401).json(error)
        } 
    },

    async getTaskDetail(req, resp) {
        try{
            const id = parseInt(req.params.id);
            const result = await taskRepository.taskDetail(id);
            return resp.status(200).json(result)
        }catch(error) {
            return resp.status(401).json(error)
        } 
    },

    async updateTask(req, resp) {
        const errors = validationResult(req.body);
        if(!errors.isEmpty()) {
            return resp.status(401).json({ error: errors.array() });
        }

        try{
            const id = parseInt(req.params.id);
            const result = await taskRepository.editTask(req.body, id);
            return resp.status(200).json(result)
        }catch(error) {
            return resp.status(401).json(error)
        } 
    },

    async deleteTask(req, resp) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return resp.status(400).json({ message: "ID inválido" });
            }
    
            const result = await taskRepository.deleteTask(id);
    
            if (result) {
                return resp.status(200).json({ message: "Tarefa deletada com sucesso" });
            } else {
                return resp.status(404).json({ message: "Tarefa não encontrada" });
            }
        } catch (error) {
            return resp.status(500).json({ message: `Erro ao deletar tarefa: ${error}` });
        }
    }

}