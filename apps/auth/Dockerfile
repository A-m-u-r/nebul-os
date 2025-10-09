FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nx.json ./

RUN npm ci

COPY libs ./libs
COPY apps/auth ./apps/auth

RUN npx nx build auth --prod

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/auth ./

RUN npm install --production

EXPOSE 3001

CMD ["node", "main.js"]
