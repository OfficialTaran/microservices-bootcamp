<template>
  <div>{{ products }}</div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ProductsMain',
    computed: {
      ...mapState({
        products: state => state.products.product_list
      })
    }
  }
</script>