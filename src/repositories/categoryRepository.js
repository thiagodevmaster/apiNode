import { prisma } from "../config/db.js";

export const categoryRepository = {
    async findAll(id) {
        const userId = parseInt(id, 10); 
        if (isNaN(userId)) {
            throw new Error("ID inválido");
        }

        return prisma.category.findMany({
            where: {user_id: userId} 
        });
    },

    async getCategoryById(id) {
        return prisma.category.findFirst({
            where: {id: id}
        });
    },

    async create(categoryData, id) {
        return await prisma.category.create({data: {
            ...categoryData,
            user_id: id
        }}); 
    }

}