// src/server.ts
import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { createUserController } from 'C:/api-gerenciador-tarefas/src/interfaces/http/controllers/create-user-controller';

const port = parseInt(process.env.PORT || '3333', 10);
const app = Fastify({ logger: true });

// --- Middlewares e Plugins ---
app.register(cors, { origin: '*' });

// --- Rotas da Aplicação ---
app.post('/users', createUserController);
// ... outras rotas virão aqui (ex: app.post('/tasks', ...))

// Rota de Health Check
app.get('/', async () => {
  return { status: 'API de Tarefas está funcionando!' };
});

const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
