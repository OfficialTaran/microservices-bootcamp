<template>
  <div id="app">
    <Products/>
  </div>
</template>

<script>
import Products from './components/Products/Products.vue'

export default {
  name: 'App',
  components: {
    Products
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