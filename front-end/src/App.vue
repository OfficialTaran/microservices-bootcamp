<template>
  <div id="app">
    <NavBar
      @goHome="page='products'"
      @goToCart="page='cart'"
      @goToOrders="page='orders'"
      @goToInventory="page='inventory'"
      ref="navbar"
    />
    <Products v-if="page === 'products'"/>
    <Cart v-else-if="page === 'cart'"/>
    <Orders v-else-if="page === 'orders'"/>
    <Inventory v-else-if="page === 'inventory'"/>
  </div>
</template>

<script>
import Products from './components/Products/Products.vue'
import NavBar from './components/NavBar.vue'
import Cart from './components/Cart.vue'
import Orders from './components/Orders/Orders.vue'
import Inventory from './components/Inventory/Main.vue'

import { tokenExchange } from '@utils/api'

export default {
  name: 'App',
  components: {
    Products,
    NavBar,
    Cart,
    Orders,
    Inventory
  },
  data () {
    return {
      page: 'products'
    }
  },
  async mounted () {
    await tokenExchange()
    this.$refs['navbar'].loadUserProfile()
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