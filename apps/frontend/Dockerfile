FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nx.json ./

RUN npm ci

COPY libs ./libs
COPY apps/frontend ./apps/frontend

RUN npx nx build frontend --prod

FROM nginx:alpine

COPY --from=builder /app/dist/apps/frontend /usr/share/nginx/html
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
