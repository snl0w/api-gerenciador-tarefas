import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { createUserController } from '@/interfaces/http/controllers/create-user-controller';
import { createTaskController } from '@/interfaces/http/controllers/create-task-controller.js';
import { editUserController } from '@/interfaces/http/controllers/edit-user-controller.js';
import { editTaskController } from '@/interfaces/http/controllers/edit-task-controller.js';
import { updateTaskStatusController } from '@/interfaces/http/controllers/update-task-status-controller.js';
import { listTasksController } from '@/interfaces/http/controllers/list-tasks-controller.js';
import { deleteTaskController } from '@/interfaces/http/controllers/delete-task-controller.js';

const port = parseInt(process.env.PORT || '3333', 10);
const app = Fastify({ logger: true });

app.register(cors, { origin: '*' });

app.post('/users', createUserController);
app.put('/users/:id', editUserController);
app.get('/tasks', listTasksController);
app.post('/tasks', createTaskController);
app.put('/tasks/:id', editTaskController);
app.patch('/tasks/:id/status', updateTaskStatusController);
app.delete('/tasks/:id', deleteTaskController);

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
