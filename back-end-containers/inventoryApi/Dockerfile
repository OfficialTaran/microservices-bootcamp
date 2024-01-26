FROM node:18-bullseye-slim
WORKDIR /usr/src
COPY inventoryApi .
COPY common /opt/nodejs
EXPOSE 80
CMD [ "npm", "start" ]