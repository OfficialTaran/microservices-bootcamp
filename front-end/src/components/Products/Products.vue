<template>
  <div>{{ products }}</div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ProductsMain',
    async created () {
      await this.load()
    },
    computed: {
      ...mapState({
        products: state => state.products.product_list
      })
    },
    methods: {
      async load () {
        await this.$store.dispatch('products/listProducts')
      }
    }
  }
</script>