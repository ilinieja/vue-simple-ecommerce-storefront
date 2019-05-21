# Landing store POC
Proof-of-concept landing store project

## Demo
Available online [here](https://poc-landing-store.herokuapp.com/)

![Demo](https://image.ibb.co/eYNucb/Peek_2017_11_07_17_09.gif)

## Stack
#### Frontend:
* [Vue.js](https://vuejs.org/)
* [Bulma](https://bulma.io/)
* [Parallax.js](http://matthew.wagerfield.com/parallax/)

#### Backend:
* [Express.js](https://expressjs.com/)

#### Payments:
* [Braintree](https://www.braintreepayments.com/)

#### Environment vars:
All needed environment variables are listed inside `.env.default` without values, with comments

Environment vars can be set in `.env` file in project root or in app settings for Heroku deployment.

#### Prod build:
``` bash
# build frontend for production with minification
npm run build
```


## Build and local run
``` bash
# install dependencies
npm install

# run server
npm start

# serve frontend with hot reload at localhost:8080
npm run dev
```
