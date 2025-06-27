FROM oven/bun:1.0

WORKDIR /usr/src/app

COPY package.json bun.lock /usr/src/app/

RUN bun install

COPY . .

RUN bunx prisma generate

EXPOSE 3333

CMD ["bun", "src/server.ts"]
