# backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copia package.json e package-lock.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia todo o código
COPY . .

# Build do NestJS
RUN npm run build

# Expõe a porta do backend
EXPOSE 3000

# Comando para rodar em produção
CMD ["npm", "run", "start:prod"]
