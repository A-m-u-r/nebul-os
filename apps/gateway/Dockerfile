FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nx.json ./

RUN npm ci

COPY libs ./libs
COPY apps/gateway ./apps/gateway

RUN npx nx build gateway --prod

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/gateway ./

RUN npm install --production

EXPOSE 3000

CMD ["node", "main.js"]
