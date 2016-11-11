FROM mhart/alpine-node:6
MAINTAINER code.vire@gmail.com

RUN npm install -g yarn

COPY yarn.lock /tmp
COPY package.json /tmp

RUN cd /tmp &&\
    yarn &&\
    mkdir /app &&\
    mv node_modules /app/node_modules &&\
    rm package.json

WORKDIR /app
COPY . /app

ARG REACT_APP_BACKEND_URL
ENV CONTAINER true

RUN yarn build
RUN yarn test
CMD ["yarn", "start:prod"]
