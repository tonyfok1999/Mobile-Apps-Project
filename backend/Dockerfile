FROM node:lts
WORKDIR /usr/src/app
COPY . .
#change the port upon main.ts
EXPOSE 8000
CMD yarn install && \ 
    yarn knex migrate:rollback && \
    yarn knex migrate:latest && \
    yarn knex seed:run && \
    yarn start
