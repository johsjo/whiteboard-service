FROM node:8.7.0

#DOCKER COMMANDS IS UPPERCASE
#Create app directory
RUN mkdir -p /usr/src/app
#CD from this directory
WORKDIR /usr/src/app

#Copy app from client to container/server
COPY . /usr/src/app/

# Install app dependencies
RUN npm i

# Which port do we want to export, if any
EXPOSE 8081

#what command should be run to start the service
CMD ["npm", "start"]
