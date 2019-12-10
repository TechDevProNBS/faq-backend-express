FROM node:12.13

COPY package.json package-lock.json* ./

RUN npm cache clean --force && npm install

CMD ["npm", "run", "start"]