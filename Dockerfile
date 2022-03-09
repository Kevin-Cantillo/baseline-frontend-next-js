FROM node:lts-alpine
RUN mkdir -p /home/app
WORKDIR /home/app
COPY . .
RUN yarn install
EXPOSE 3000
# ENTRYPOINT  ["node", "src/app.js"]
ENTRYPOINT  ["yarn", "run", "dev"]