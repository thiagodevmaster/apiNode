import { validationResult } from "express-validator";
import userRepositorie from "../repositories/userRepository.js";
import { authService } from "../services/AuthService.js";

const UserController = {
    async getAllUsers(req, resp) {
        try {
            const users = await userRepositorie.findAll();
            resp.status(200).json(users)
        }catch (error) {
            resp.status(500).json({ error: "Erro ao buscar usuários" });
        }
    },

    async createUser(req, res) {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newUser = await userRepositorie.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar usuário" });
        }
    },

    async login(req, resp) {
        try{
            const {email, password} = req.body;
            const result = await authService.login({email, password});
            resp.status(200).json(result); 
        } catch (error) {
            resp.status(401).json({ error: error.message });
        }
    },

    async getTasks(req, resp) {
        try{
            const id = req.userId;
            const result = await userRepositorie.tasksByUser(id);
            resp.status(200).json(result); 
        }catch (error) {
            resp.status(401).json({ error: error.message });
        }
    }
 
}

export default UserController;