# Landing store POC
Proof-of-concept landing store project

## Demo
Available [here](https://poc-landing-store.herokuapp.com/)

![Demo](https://image.ibb.co/bzbKqw/Peek_2017_11_05_18_03.gif)

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
Can be set in `.env` file in project root for local project run.
```
PORT= # server will listen on this prot
BT_MERCHANT_ID=
BT_PUBLIC_KEY=
BT_PRIVATE_KEY=
```
`BT_` environment variables can be obtained by signing up at [Braintree](https://www.braintreepayments.com/)

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
