import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";

const userRepositorie = {
    async findAll() {
        return await prisma.user.findMany()
    },

    async create(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword
            }
        })
    },

    async findByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    },

    async login(credentials) {
        const user = await this.findByEmail(credentials.email);
        if(!user){
            throw new Error("Usuário não encontrado");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Credenciais inválidas");
        }

        return user;
    },

    async tasksByUser(id) {
        const userId = parseInt(id, 10); 
        if (isNaN(userId)) {
            throw new Error("ID inválido");
        }
        const user = await prisma.user.findFirst({
            where: {id: userId},
            include: { tasks: true}
        });

        if(!user){
            throw new Error("Usuário não encontrado")
        }

        return user.tasks;
    }
}

export default userRepositorie;