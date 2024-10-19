FROM node:18-buster-slim AS base

WORKDIR /app
COPY package.json ./
RUN npm install -f
COPY . .
RUN chown node:node /app

EXPOSE 3000

CMD ["npm", "run", "dev"]
