<template>
  <div>
    <Spinner v-if="loading"/>
    <div class="list d-flex flex-wrap justify-content-center">
      <b-card
        v-for="(item, key) in products"
        :key="`list_item_${key}`"
        :title="item.name"
        class="m-2 card"
      />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Spinner from '@common/LoadingSpinner.vue'

  export default {
    name: 'ProductsMain',
    components: {
      Spinner
    },
    async created () {
      await this.load()
    },
    computed: {
      ...mapState({
        products: state => state.products.product_list,
        loading: state => state.products.loading
      })
    },
    methods: {
      async load () {
        await this.$store.dispatch('products/listProducts')
      }
    }
  }
</script>
<style scoped>
.list {
  width: 75vw;
  margin: auto;
}
.card {
  width: 400px
}
</style>
