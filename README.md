# API de Gestão de Tarefas – Teste Técnico

Esta é a implementação de uma API REST para gestão de tarefas, desenvolvida para um desafio técnico que avalia boas práticas de arquitetura de software, domínio de TypeScript e uso de ferramentas modernas como Bun e Docker.

## 🎯 Objetivo

O objetivo foi construir uma API robusta, escalável e de fácil manutenção, aplicando os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)** para garantir uma separação de responsabilidades clara e um baixo acoplamento entre as camadas do sistema.

## 🧱 Arquitetura Aplicada

O projeto segue uma arquitetura em camadas para isolar o núcleo de regras de negócio de detalhes de infraestrutura.

- **Domain**: Contém as entidades (`User`, `Task`), objetos de valor e os contratos (interfaces) dos repositórios. É o coração do sistema, sem dependências externas.
- **Application**: Orquestra os fluxos de dados através dos Casos de Uso (Use Cases), que implementam a lógica da aplicação.
- **Infrastructure**: Contém as implementações concretas de tecnologias externas, como a conexão com a base de dados (usando Prisma).
- **Interfaces**: A camada mais externa, responsável pela interação com o mundo. Inclui os controladores HTTP (usando Fastify), as rotas e a validação de dados de entrada (usando Zod).

## ✅ Funcionalidades Implementadas

- [x] **Criar usuário**
- [x] **Editar usuário**
- [x] **Criar tarefa**
- [x] **Editar tarefa**
- [x] **Atualizar status da tarefa**
- [x] **Listar tarefas com filtros** (por usuário e status)
- [x] **Deletar tarefa**

## 🛠️ Stack Tecnológica

- **Linguagem**: TypeScript
- **Runtime**: Bun
- **Framework HTTP**: Fastify
- **Base de Dados**: PostgreSQL (via Docker)
- **ORM**: Prisma
- **Validação**: Zod
- **Containerização**: Docker & Docker Compose
- **Estilo de Código**: ESLint + Prettier

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Bun](https://bun.sh/docs/installation)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Passos para a Execução

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DA_PASTA>
    ```

2.  **Crie o ficheiro de variáveis de ambiente (`.env`):**
    Crie um ficheiro chamado `.env` na raiz do projeto com o seguinte conteúdo.

    ```
    # Conteúdo do .env
    DB_HOST=db
    DB_USER=docker
    DB_PASS=docker
    DB_NAME=taskmanager
    DB_PORT=5432
    DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
    ```

3.  **Suba os containers:**
    Este comando irá construir a imagem da API e iniciar todos os serviços em segundo plano.

    ```bash
    docker-compose up -d --build
    ```

4.  **Aplique as migrações da base de dados:**
    Com os containers a correr, execute o comando abaixo para criar as tabelas na base de dados.
    ```bash
    docker-compose exec api bunx prisma migrate dev
    ```

A API estará agora acessível em `http://localhost:3333`.

## 🧪 Endpoints da API

- `POST /users` - Cria um novo usuário.
- `PUT /users/:id` - Edita o nome de um usuário.
- `POST /tasks` - Cria uma nova tarefa.
- `GET /tasks` - Lista todas as tarefas.
- `GET /tasks?userId=:userId&status=:status` - Lista tarefas com filtros.
- `PUT /tasks/:id` - Edita o título e a descrição de uma tarefa.
- `PATCH /tasks/:id/status` - Atualiza o status de uma tarefa.
- `DELETE /tasks/:id` - Deleta uma tarefa.
