FROM node:16-slim

WORKDIR /app

ADD index.html .
ADD index.js .
ADD package.json .

RUN yarn install
EXPOSE 8080
ENV NODE_ENV=PROD

CMD ["node", "index.js"]
