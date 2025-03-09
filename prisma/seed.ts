import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Função para criar um usuário com senha hasheada
async function createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await prisma.user.create({
        data: {
            ...userData,
            password: hashedPassword,
        },
    });
}

// Função principal do seeder
async function main() {
    // Limpar o banco de dados
    await prisma.task.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Criar 10 usuários
    for (let i = 0; i < 10; i++) {
        const user = await createUser({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(), // Senha aleatória (será hasheada)
        });

        console.log(`Usuário criado: ${user.name} (${user.email})`);

        // Criar categorias aleatórias para o usuário (entre 1 e 5 categorias)
        const categoryCount = faker.number.int({ min: 1, max: 5 });
        for (let j = 0; j < categoryCount; j++) {
            const category = await prisma.category.create({
                data: {
                    name: faker.lorem.word(),
                    user_id: user.id,
                },
            });

            console.log(`Categoria criada: ${category.name} para o usuário ${user.name}`);

            // Criar tarefas aleatórias para a categoria (entre 1 e 10 tarefas)
            const taskCount = faker.number.int({ min: 1, max: 10 });
            for (let k = 0; k < taskCount; k++) {
                await prisma.task.create({
                    data: {
                        title: faker.lorem.words(3),
                        description: faker.lorem.sentence(),
                        dueDate: faker.date.future(),
                        priority: faker.helpers.arrayElement(['alta', 'media', 'baixa']),
                        status: faker.helpers.arrayElement(['pendente', 'completa']),
                        user_id: user.id,
                        category_id: category.id,
                    },
                });
            }

            console.log(`${taskCount} tarefas criadas para a categoria ${category.name}`);
        }
    }

    console.log('Seeder concluído com sucesso!');
}

// Executar o seeder
main()
    .catch((e) => {
        console.error('Erro ao executar o seeder:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });