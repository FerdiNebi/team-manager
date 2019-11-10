# base image
FROM node:12.2.0

LABEL Maintainer = Ferdi
LABEL Name = Team Manager UI

# #############################################################################
# Cache layer with package.json for node_modules 
#
ADD package.json package-lock.json ./tmp/
RUN cd /tmp && npm i npm@latest -g && npm install && npm i -g nodemon
RUN mkdir -p /home/app/angular-app && cp -a /tmp/node_modules /home/app/angular-app

# #############################################################################
# Application Code
#
COPY . /home/app/angular-app

# #############################################################################
# Expose
#
WORKDIR /home/app/angular-app
EXPOSE 4200

# start app
ENTRYPOINT ["/bin/bash", "-c", "npm run start"]

#docker run -v ${PWD}/src:/home/app/angular-app/src -p 4200:4200 teammanager.ui:latest