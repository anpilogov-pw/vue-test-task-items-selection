# syntax=docker/dockerfile:1

FROM node:20-alpine

WORKDIR /app

# Устанавливаем зависимости отдельно для кэша
COPY package*.json ./
RUN npm ci

# Копируем исходники
COPY . .

EXPOSE 5173

# Важно: Vite должен слушать 0.0.0.0 внутри контейнера
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
