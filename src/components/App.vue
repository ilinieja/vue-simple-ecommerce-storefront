<template>
    <div id="app">
        <div class="hero-head">
            <div class="container">
                <nav class="nav">
                    <div class="container">
                        <div class="nav-left">
                            <router-link to="/" class="nav-item">Pusheen</router-link>
                        </div>
                        <div class="nav-right">
                            <a class="nav-item" href="mailto:b2709f1b@gmail.com?Subject=Landing store demo feedback">Contact</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<style scoped>
    #app {
        min-height: 100vh;
        position: relative;
    }
</style>

<script>
    export default {
        name: 'app',
        data() {
            return {}
        }
    }
</script>