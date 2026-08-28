FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência primeiro para aproveitar o cache do Docker
COPY package*.json ./

RUN npm install

# Copia o resto dos arquivos do projeto
COPY . .

EXPOSE 3000

# Executa o Vite e expõe para 0.0.0.0 para ser acessível fora do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
