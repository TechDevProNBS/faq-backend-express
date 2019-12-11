FROM node:12.13

COPY package-lock.json* ./

RUN npm cache clean --force && npm install

CMD ["node Express.js"]