import app from "./app.js";
import { prisma, testConnection } from "./config/db.js";

async function startServer(PORT) {
    await testConnection();

    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
}

startServer(3000).catch((error) => {
    console.error("❌ Erro ao iniciar o servidor:", error);
    process.exit(1);
});