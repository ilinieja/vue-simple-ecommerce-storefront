<template>
    <div class="section product-section">
        <div class="container">
            <div class="columns is-vcentered">
                <div class="column is-6 product-image-container" ref="parallax-container">
                    <img class="product-image-main-el" src="../assets/hex.svg"
                         data-depth="0.1"
                    >
                    <img class="product-image-additional-el"
                         src="../assets/line.svg"
                         data-depth="0.2"
                    >
                    <img class="product-image-fragment-el"
                         src="../assets/fragment.svg"
                         data-depth="0.5"
                    >
                    <img class="product-image-fragment-el-1"
                         src="../assets/fragment1.svg"
                         data-depth="1.0"
                    >
                    <img class="product-image-fragment-el-2"
                         src="../assets/fragment2.svg"
                         data-depth="0.4"
                    >
                </div>
                <div class="column is-5 is-offset-1">
                    <div class="title is-2">Abstract minimal thing</div>
                    <p class="title is-3 has-text-muted">$1</p>
                    <hr>
                    <br>
                    <p>This thing is abstract and it's minimal. Yeah, this demo is not about long and clever product
                        description. It's about pretty Vue frontend and payments integration. Proceed to order details
                        to see more.</p>
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

    .product-image-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .product-image-main-el {
        height: 450px;
    }

    .product-image-additional-el {
        height: 350px;
        margin-left: 120px;
        margin-top: 70px;
    }

    .product-image-fragment-el {
        height: 100px;
        margin-top: 50px;
        margin-left: 150px;
    }

    .product-image-fragment-el-1 {
        height: 50px;
        margin-top: 180px;
        margin-left: 250px;
        transform: rotate(20deg);
    }

    .product-image-fragment-el-2 {
        height: 100px;
        margin-top: 60px;
        margin-left: 350px;
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
                    scalarX: 2,
                    scalarY: 5,
                }
            );
        }
    }
</script>