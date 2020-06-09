# pull official base image
FROM node:14.4.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN yarn install

# add app
COPY . ./

# port to expose
EXPOSE 3000

# start app
CMD ["yarn", "start"]
