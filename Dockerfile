FROM node:10

# create app directory
WORKDIR /usr/src/app

# install dependencies
COPY package.json .
RUN npm install --silent

# start app
CMD ["npm", "start"]
