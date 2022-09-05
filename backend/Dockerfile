FROM node:lts
WORKDIR /usr/src/app
COPY . .
#change the port upon main.ts
EXPOSE 3000
CMD yarn install && \ 
    yarn knex migrate:latest &&\
    yarn knex seed:run &&\
    yarn ts-node main.ts
