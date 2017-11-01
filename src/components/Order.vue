<template>
    <div class="container">
        <div class="columns is-vcentered">
            <div class="column is-6">
                <div class="product-image-container">
                    <img class="product-image" src="../assets/hex-line.svg" alt="Minimal thing">
                </div>
            </div>

            <div class="column is-6">
                <div class="field">
                    <label>Name</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="First and Last" v-model="name">
                        <span class="icon is-small is-left"><i class="fa fa-user"></i></span>
                    </div>
                </div>

                <div class="field">
                    <label>Email</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Email address" v-model="email">
                        <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
                    </div>
                </div>

                <hr id="left-line">

                <div class="field">
                    <label for="card_number">Card Number</label>
                    <input id="card_number" v-model="card.number" type="text"
                           :class="['is-danger' ? cardNumberError : '', 'input']" placeholder="4242424242424242">
                    <span class="help is-danger" v-show="cardNumberError">{{ cardNumberError }}</span>
                </div>

                <div class="columns">
                    <div class="field column">
                        <label for="exp_month">Expiry Month</label>
                        <input id="exp_month"
                               v-model="card.exp_month"
                               type="text"
                               :class="['is-danger' ? cardMonthError : '', 'input']"
                               placeholder="MM"
                        >
                        <span class="help is-danger" v-show="cardMonthError">{{ cardMonthError }}</span>
                    </div>

                    <div class="field column">
                        <label for="exp_month">Expiry Year</label>
                        <input id="exp_year"
                               v-model="card.exp_year"
                               type="text"
                               :class="['is-danger' ? cardYearError : '', 'input']"
                               placeholder="YY"
                        >
                        <span class="help is-danger" v-show="cardYearError">{{ cardYearError }}</span>
                    </div>

                    <div class="field column">
                        <label for="cvc">CVC</label>
                        <input id="cvc" v-model="card.cvc" type="text" class="input" placeholder="123">
                        <span class="help is-danger" v-show="cardCvcError">{{ cardCvcError }}</span>
                    </div>
                </div>

                <div class="help is-danger" v-if="cardCheckError">
                    <span>{{ cardCheckErrorMessage }}</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <button type="submit"
                        class="button is-primary is-large is-pulled-right"
                        @click.prevent="validate"
                        :disabled="cardCheckSending"
                >
                    <span v-if="cardCheckSending"><i class="fa fa-btn fa-spinner fa-spin"></i>Ordering…</span>
                    <span v-else>Place Order</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style>
    .product-image-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .product-image {
        height: 400px;
    }

    .container {
        margin-bottom: 30px;
    }
</style>

<script>
    import axios from 'axios';
    export default {
        data(){
            return {
                stripeKey: 'pk_test_Ng7fkuBEMT9NVNffLfW45VWj',
                name: 'Just Testing',
                email: 'justtesting@gmail.com',
                card: {
                    number: '5555555555554444',
                    cvc: '123',
                    exp_month: '12',
                    exp_year: '30'
                },
                cardNumberError: null,
                cardCvcError: null,
                cardMonthError: null,
                cardYearError: null,
                cardCheckSending: false,
                cardCheckError: false,
                cardCheckErrorMessage: ''
            }
        },
        methods: {
            validate(){
                this.clearCardErrors();
                let valid = true;
                if (!this.card.number) {
                    valid = false;
                    this.cardNumberError = 'Card Number is Required'
                }
                if (!this.card.cvc) {
                    valid = false;
                    this.cardCvcError = 'CVC is Required'
                }
                if (!this.card.exp_month) {
                    valid = false;
                    this.cardMonthError = 'Month is Required'
                }
                if (!this.card.exp_year) {
                    valid = false;
                    this.cardYearError = 'Year is Required'
                }
                if (valid) {
                    this.createToken();
                }
            },
            clearCardErrors(){
                this.cardNumberError = null;
                this.cardCvcError = null;
                this.cardMonthError = null;
                this.cardYearError = null;
            },
            createToken() {
                this.cardCheckError = false;
                window.Stripe.setPublishableKey(this.stripeKey);
                window.Stripe.createToken(this.card, this.stripeResponseHandler.bind(this));
                this.cardCheckSending = true;
            },
            stripeResponseHandler(status, response) {
                this.cardCheckSending = false;
                if (response.error) {
                    this.cardCheckErrorMessage = response.error.message;
                    this.cardCheckError = true;
                    console.error(response.error);
                    return;
                }

                const token_from_stripe = response.id;
                const request = {
                    name: this.name,
                    email: this.email,
                    specialNote: this.specialNote,
                    address: this.address,
                    card: this.card,
                    token_from_stripe: token_from_stripe
                };

                axios.post(`${window.endpoint}/charge`, request)
                    .then((res) => {
                        const error = res.data.error;
                        const charge = res.data.charge;
                        if (error) {
                            console.error(error);
                            return;
                        }
                        this.$router.push({ path: `order-complete/${charge.id}` });
                    });
            }
        }
    }
</script>