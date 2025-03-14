import app from "./app.js";
import { prisma, testConnection } from "./config/db.js";

const PORT = process.env.PORT || 3000;

async function startServer(PORT) {
    try {
        await testConnection();

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Erro ao iniciar o servidor:", error);
        process.exit(1);
    }
}

startServer(PORT);