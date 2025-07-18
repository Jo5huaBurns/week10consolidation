FROM node:10-alpine
COPY script.js .
WORKDIR .
RUN npm install
CMD [ "node", "script.js" ]
