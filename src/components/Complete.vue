<template>
    <div class="container content">
        <br>
        <h3>Order complete!</h3>
        <p>
            Congratulations! You bought Pusheen, enjoy it responsibly.
            <br>
            Contact us: <a href="mailto:b2709f1b@gmail.com?Subject=Landing store demo feedback">b2709f1b@gmail.com</a>
            <br>
            Thank you!
        </p>
        <div v-if="orderDetails">
            <dl>
                <dt>Order Number</dt>
                <dd>{{ orderDetails.id }}</dd>
                <dt>Order Date</dt>
                <dd>{{ orderDetails.created | moment }}</dd>
                <dt>Payment Amount</dt>
                <dd>{{ orderDetails.amount | currency }}</dd>
                <dt>Email</dt>
                <dd>{{ orderDetails.receipt_email }}</dd>
            </dl>
        </div>
    </div>
</template>
<style>
    dt {
        font-weight: bold;
    }
</style>
<script>
    import axios from 'axios';
    import moment from 'moment';

    export default {
        data() {
            return { orderDetails: false };
        },
        created() {
            const charge_id = this.$route.params.id;
            axios.get(`${window.endpoint}/charge/${charge_id}`)
                .then((res) => {
                    this.orderDetails = res.data.charge;
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
</script>