<template>
    <div class="section product-section">
        <div class="container">
            <div class="columns is-vcentered">
                <div class="column is-6 product-image-container" ref="parallax-container">
                    <img class="product-image-bg-el" src="../assets/bg.svg"
                         data-depth="0.4"
                    >
                    <img class="product-image-bg-el" src="../assets/cloud2.svg"
                         data-depth="0.5"
                    >
                    <img class="product-image-bg-el" src="../assets/cloud1.svg"
                         data-depth="0.8"
                    >
                    <img class="product-image-bg-el" src="../assets/cloud.svg"
                         data-depth="1.6"
                    >
                    <img class="product-image-bg-el" src="../assets/bg1.svg"
                         data-depth="1.6"
                    >
                    <img class="product-image-main-el" src="../assets/pusheen.svg"
                         data-depth="2.4"
                    >
                </div>
                <div class="column is-5 is-offset-1">
                    <div class="title is-2">Pusheen cat</div>
                    <p class="title is-3 has-text-muted">$1</p>
                    <hr>
                    <br>
                    <p>This is a cat and its name is Pusheen. It's cute. Buy it to test payment integration.
                        Integration is sandboxed, so you can use test payment data from
                        <a target="_blank" href="https://developers.braintreepayments.com/guides/credit-cards/testing-go-live/node">
                            here
                        </a>
                    </p>
                    <br>
                    <br>
                    <p class="level">
                        <router-link to="/order" class="button is-large is-primary level-item has-text-centered">
                            Buy Now
                        </router-link>
                    </p>
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .product-section {
        padding-top: 6rem;
    }

    .product-image-main-el, .product-image-bg-el {
        width: 80%;
    }
</style>

<script>
    import Parallax from 'parallax-js';

    export default {
        mounted() {
            const parallax = new Parallax(
                this.$refs['parallax-container'],
                {
                    relativeInput: true,
                    limitY: 20,
                    limitX: 40,
                    hoverOnly: true,
                }
            );
        }
    }
</script>