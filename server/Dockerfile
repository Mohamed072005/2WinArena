FROM node:20.17.0

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install && npm install -g @nestjs/cli

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "start:dev" ]