require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const braintree = require('braintree');
const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BT_MERCHANT_ID,
    publicKey: process.env.BT_PUBLIC_KEY,
    privateKey: process.env.BT_PRIVATE_KEY
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.get('/client_token', (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        res.send(response.clientToken);
    });
});

app.post('/charge', (req, res) => {
    const nonce = req.body.payment_method_nonce;

    const charge = {
        amount: '1.00',
        paymentMethodNonce: nonce,
        customer: {
            email: req.body.email
        }
    };

    gateway.transaction.sale(charge, (err, charge) => {
        if (err) {
            console.error(err);
            res.json({ error: err, charge: false });
        } else {
            res.json({ error: false, charge: charge });
        }
    });
});

app.get('/charge/:id', (req, res) => {
    gateway.transaction.find(req.params.id, (err, charge) => {
        if (err) {
            res.json({ error: err, charge: false });
            return;
        }

        res.json({ error: false, charge: charge });
    });
});

app.use('/dist', express.static(`${__dirname}/dist`));
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
    console.log('Server listening on port ' + port)
});
