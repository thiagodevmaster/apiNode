// config/db.js
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function testConnection() {
    try {
        await prisma.$connect();
        console.log("✅ Conectado ao banco de dados com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    console.error("❌ A variável SECRET_KEY não está definida no .env");
    process.exit(1);
}

export { prisma, testConnection, SECRET_KEY };