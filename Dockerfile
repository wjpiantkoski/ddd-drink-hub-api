FROM node:16

WORKDIR /app

EXPOSE 3030

CMD ["sh", "-c", "rm -rf node_modules && npm install && npm run dev"]