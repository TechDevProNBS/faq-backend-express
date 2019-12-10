FROM node:8.11.1

COPY package.json package-lock.json* ./

RUN npm cache clean --force && npm install

CMD ["npm", "run", "start"]