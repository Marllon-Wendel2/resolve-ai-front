# Ambiente de desenvolvimento (hot-reload).
# O compose bind-mounta o código por cima e usa volumes nomeados
# para node_modules e .next, preservando o que foi instalado aqui.
FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
