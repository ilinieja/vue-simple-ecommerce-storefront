<template>
    <div class="container">
        <div class="columns is-vcentered">
            <div class="column is-6">
                <div class="product-image-container">
                    <img class="product-image" src="../assets/pusheen.svg" alt="Minimal thing">
                </div>
            </div>

            <div class="column is-6">
                <div class="field">
                    <label>Name</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input"
                               type="text"
                               placeholder="First and Last"
                               v-model="name"
                               :class="{ 'is-danger': nameError }"
                               @keyup="validate"
                               @focus="clearErrors"
                        >
                        <span class="icon is-small is-left"><i class="fa fa-user"></i></span>
                    </div>
                    <div class="help is-danger" v-if="nameError">
                        <span>{{ nameError }}</span>
                    </div>
                </div>

                <div class="field">
                    <label>Email</label>
                    <div class="control has-icons-left has-icons-right" :class="{ 'is-danger': emailError }">
                        <input
                                class="input"
                                type="text"
                                placeholder="Email"
                                v-model="email"
                                :class="{ 'is-danger': emailError }"
                                @keyup="validate"
                                @focus="clearErrors"
                        >
                        <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
                    </div>
                    <div class="help is-danger" v-if="emailError">
                        <span>{{ emailError }}</span>
                    </div>
                </div>

                <div id="dropin-placeholder">
                    <button type="button"
                            class="button is-large card-placeholder"
                            :disabled="true"
                            :class="{ 'is-loading': true }"
                            v-if="loadingDropin"
                    ></button>
                </div>
                <div id="dropin-container" :class="{ 'is-hidden': loadingDropin }"></div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <button type="submit"
                        class="button is-primary is-large is-pulled-right"
                        @click="createPayment"
                        :disabled="loadingDropin || cardCheckSending || !formValid"
                        :class="{ 'is-loading': cardCheckSending }"
                        ref="submit-button"
                > Place Order
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

    .card-placeholder {
        height: 227px;
        width: 100%;
        margin: 32px 0 13px 0;
    }
</style>

<script>
    import axios from 'axios';
    import dropin from 'braintree-web-drop-in';

    export default {
        data(){
            return {
                name: 'Just Testing',
                email: 'justtesting@gmail.com',
                nameError: false,
                emailError: false,
                cardCheckSending: false,
                loadingDropin: true,
                formValid: true,
            }
        },
        created() {
            this.btClientTokenPromise = axios.get(`${window.endpoint}/client_token`);
        },
        mounted() {
            this.btClientTokenPromise
                .then((token) => {
                    return dropin.create({
                        authorization: token.data,
                        container: '#dropin-container'
                    });
                })
                .then((instance) => {
                    this.loadingDropin = false;
                    this.dropinInstance = instance;
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        methods: {
            validate(){
                this.clearErrors();
                this.formValid = true;
                if (!this.name) {
                    this.formValid = false;
                    this.nameError = 'Name is required'
                }
                if (!this.email) {
                    this.formValid = false;
                    this.emailError = 'Email is required'
                }
            },
            clearErrors(){
                this.nameError = null;
                this.emailError = null;
            },
            createPayment() {
                if (!this.formValid) {
                    return;
                }

                this.cardCheckSending = true;
                this.dropinInstance.requestPaymentMethod(this.completePayment.bind(this));
            },
            completePayment(err, payload) {
                if (err) {
                    this.cardCheckSending = false;
                    console.error(err);
                    return;
                }

                const request = {
                    email: this.email,
                    payment_method_nonce: payload.nonce,
                };

                axios.post(`${window.endpoint}/charge`, request)
                    .then((res) => {
                        this.cardCheckSending = false;
                        const charge = res.data.charge;
                        if (res.data.error) {
                            console.error(res.data.error);
                            return;
                        }
                        this.$router.push({ path: `order-complete/${charge.id}` });
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
        }
    }
</script>