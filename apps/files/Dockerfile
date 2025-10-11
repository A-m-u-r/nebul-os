FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nx.json ./

RUN npm ci

COPY libs ./libs
COPY apps/files ./apps/files

RUN npx nx build files --prod

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/files ./

RUN npm install --production

EXPOSE 3002

CMD ["node", "main.js"]
