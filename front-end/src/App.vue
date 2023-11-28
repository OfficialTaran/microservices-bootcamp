<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Our Microservice Front End"/>
    <ProductsMain/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ProductsMain from './components/Products/Products.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ProductsMain
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
