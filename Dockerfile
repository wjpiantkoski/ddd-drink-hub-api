FROM node:16.20.0-alpine3.17

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run tsc

FROM node:16.20.0-alpine3.17

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

COPY --from=0 /app/dist .

RUN npm install pm2 -g

EXPOSE 3000
CMD ["pm2-runtime","./server.js"]