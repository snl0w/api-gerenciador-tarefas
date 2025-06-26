FROM oven/bun:1.0 as base

WORKDIR /usr/src/app

COPY package.json bun.lock ./

RUN bun install

COPY prisma ./prisma/

COPY src ./src

EXPOSE 3333

CMD ["bun", "src/server.ts"]
