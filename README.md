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
    git clone https://github.com/snl0w/api-gerenciador-tarefas.git
    cd api-gerenciador-tarefas
    ```

2.  **Crie o arquivo de variáveis de ambiente (`.env`):**
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
    Com os containers em execução, execute o comando abaixo para criar as tabelas na base de dados.
    ```bash
    docker-compose exec api bunx prisma migrate dev
    ```

A API estará agora acessível em `http://localhost:3333`.

## 🧪 Executando os Testes

Os testes foram implementados principalmente na camada application, cobrindo os casos de uso principais.

A abordagem de testes utiliza:
-   O runner de testes nativo do Bun (`bun test`).
-   Repositórios "em memória" para isolar os casos de uso da base de dados, permitindo testes rápidos e confiáveis.

Para executar todos os testes, rode o seguinte comando no seu terminal:

```bash
bun test
```

Os arquivos de teste podem ser encontrados ao lado dos casos de uso que eles testam, com o sufixo `.test.ts`.

## 🛠️ Como Usar a API (Testes Manuais)

Como esta aplicação é uma API de backend, é necessário usar uma ferramenta de cliente HTTP para interagir com os endpoints.

**Recomendações de Ferramentas:**

- **[Insomnia](https://insomnia.rest/download)** (Recomendado)
- **[Postman](https://www.postman.com/downloads/)**

> **Nota:** Para obter os `:id` de usuários ou tarefas necessários para os exemplos abaixo, você pode primeiro criá-los e depois usar o Prisma Studio (`bun run db:studio` com as devidas alterações no `.env`) ou o endpoint `GET /tasks` para visualizar os IDs gerados.

---

### 1. Criar um Novo Usuário

- **Método:** `POST`
- **URL:** `http://localhost:3333/users`
- **Corpo (JSON):**
  ```json
  {
    "name": "Bruce Wayne",
    "email": "bruce@example.com",
    "password": "password123"
  }
  ```
- **Resposta Esperada:** `Status: 201 Created`

---

### 2. Editar um Usuário

- **Método:** `PUT`
- **URL:** `http://localhost:3333/users/:id` (substitua `:id` pelo ID do usuário)
- **Corpo (JSON):**
  ```json
  {
    "name": "Batman"
  }
  ```
- **Resposta Esperada:** `Status: 204 No Content`

---

### 3. Criar uma Nova Tarefa

- **Método:** `POST`
- **URL:** `http://localhost:3333/tasks`
- **Corpo (JSON):** (substitua o `userId` pelo ID de um usuário existente)
  ```json
  {
    "title": "Conquistar Gotham",
    "description": "Elaborar um plano para garantir a segurança da cidade.",
    "userId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  }
  ```
- **Resposta Esperada:** `Status: 201 Created`

---

### 4. Editar uma Tarefa

- **Método:** `PUT`
- **URL:** `http://localhost:3333/tasks/:id` (substitua `:id` pelo ID da tarefa)
- **Corpo (JSON):**
  ```json
  {
    "title": "Salvar Gotham City",
    "description": "O plano já está em andamento."
  }
  ```
- **Resposta Esperada:** `Status: 204 No Content`

---

### 5. Atualizar Status de uma Tarefa

- **Método:** `PATCH`
- **URL:** `http://localhost:3333/tasks/:id/status` (substitua `:id` pelo ID da tarefa)
- **Corpo (JSON):**
  ```json
  {
    "status": "IN_PROGRESS"
  }
  ```
- **Resposta Esperada:** `Status: 204 No Content`

---

### 6. Listar Tarefas com Filtros

- **Método:** `GET`
- **Exemplos de URLs:**
  - `http://localhost:3333/tasks` (lista todas as tarefas)
  - `http://localhost:3333/tasks?status=COMPLETED` (lista tarefas concluídas)
  - `http://localhost:3333/tasks?userId=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` (lista tarefas de um usuário)
- **Resposta Esperada:** `Status: 200 OK` e um array com as tarefas.

---

### 7. Deletar uma Tarefa

- **Método:** `DELETE`
- **URL:** `http://localhost:3333/tasks/:id` (substitua `:id` pelo ID da tarefa)
- **Corpo:** Nenhum (No Body)
- **Resposta Esperada:** `Status: 204 No Content`
