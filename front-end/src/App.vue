<template>
  <div id="app">
    <ProductsMain/>
  </div>
</template>

<script>
import ProductsMain from './components/Products/Products.vue'

export default {
  name: 'App',
  components: {
    ProductsMain
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