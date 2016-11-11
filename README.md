# kyberia-client

> a project for building the new UI of kyberia.sk

[![Build Status](https://travis-ci.org/vire/kyberia-client.svg?branch=master)](https://travis-ci.org/vire/kyberia-client) [![codecov](https://codecov.io/gh/vire/kyberia-client/branch/master/graph/badge.svg)](https://codecov.io/gh/vire/kyberia-client)

### Extends [create-react-app](https://github.com/facebookincubator/create-react-app)

### How to
* get code: clone repo and install deps `yarn` or `npm install`
* run: `npm start`
* build: `npm run build`
* test: `npm test`


### Docker

* build container `docker build -t kyberia-client --build-arg REACT_APP_BACKEND_URL=http://example.com/ .`
* run compiled app `docker run --rm -it -p 80:9000 kyberia-client`

