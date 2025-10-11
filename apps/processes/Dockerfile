FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nx.json ./

RUN npm ci

COPY libs ./libs
COPY apps/processes ./apps/processes

RUN npx nx build processes --prod

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/processes ./

RUN npm install --production

EXPOSE 3003

CMD ["node", "main.js"]
