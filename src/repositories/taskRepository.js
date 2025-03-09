import { prisma } from "../config/db.js";

export const taskRepository = {
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
    },

    async create(taskData, id){
        return prisma.task.create({
            data: {
                ...taskData,
                user_id: id
            }
        });
    },

    async taskDetail(taskId){
        return prisma.task.findFirst({
            where: { id: taskId },
            include: {
                category: true
            }
        });
    },

    async editTask(taskData, taskId) {
        return await prisma.task.update({
            where: { id: taskId }, 
            data: taskData,
        });
    },

    async deleteTask(taskId) {
        return await prisma.task.delete({
            where: {id: taskId}
        });
    }
}