FROM node:14.15-alpine

WORKDIR /usr/src/app

COPY back-end/package.json back-end/yarn.lock /usr/src/app/

COPY back-end/dist/. /usr/src/app/
RUN yarn install

EXPOSE 3000

CMD ["node", "index.js"]