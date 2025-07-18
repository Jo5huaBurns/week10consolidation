FROM node:18-alpine3.23
COPY script.js .
WORKDIR .
RUN npm install
CMD [ "node", "script.js" ]
