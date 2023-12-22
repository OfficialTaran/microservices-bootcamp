<template>
  <div id="app">
    <NavBar
      @goHome="page='products'"
      @goToCart="page='cart'"
    />
    <Products v-if="page === 'products'"/>
    <Cart v-else-if="page === 'cart'"/>
  </div>
</template>

<script>
import Products from './components/Products/Products.vue'
import NavBar from './components/NavBar.vue'
import Cart from './components/Cart.vue'
// import Orders from './components/Orders/Orders.vue'

export default {
  name: 'App',
  components: {
    Products,
    NavBar,
    Cart
  },
  data () {
    return {
      page: 'products'
    }
  }
}
</script>
<style>
.clickable {
  cursor: pointer;
}
.inline-card-text {
  font-size: 20px;
}
.label {
  font-weight: 500;
}
.title {
  font-weight: 700;
}
</style>