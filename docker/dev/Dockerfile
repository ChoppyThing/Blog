FROM node:carbon

ENV LANG="en_US.UTF-8" \
    #LC_ALL="en_US.UTF-8" \
    LANGUAGE="en_US.UTF-8" \
    TERM="xterm" \
    DEBIAN_FRONTEND="noninteractive" \
    SYMFONY_ALLOW_APPDEV=1 \
    NODE_VERSION=6.9.4 \
    COMPOSER_ALLOW_SUPERUSER=1

#EXPOSE 8080
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

RUN npm install --quiet
#RUN npm install -g loopback-cli
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
#COPY . ../../app/

# CMD [ "./node_modules/.bin/nodemon", "server.js" ]
#WORKDIR /app/react-boilerplate
CMD [ "npm", "start" ]
#WORKDIR /app