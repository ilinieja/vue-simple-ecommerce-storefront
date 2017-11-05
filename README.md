# Landing store POC
Proof-of-concept landing store project

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

Environment vars can be set in `.env` file in project root for local project run.

## Build and  run
``` bash
# install dependencies
npm install

# build frontend for production with minification
npm run build

# run server
npm start

# serve frontend with hot reload at localhost:8080
npm run dev
```
