<template>
  <div>
    <Spinner v-if="loading"/>
    <div class="list d-flex flex-wrap justify-content-center">
      <b-card
        v-for="(item, key) in products"
        :key="`list_item_${key}`"
        :title="item.name"
        class="m-2 card"
      >
        <div class="d-flex justify-content-end">
          <Icon
            icon="info-circle"
            @click="openProductInfo(item.id)"
          />
        </div>
      </b-card>
    </div>
    <ProductInfo
      ref="product-info-modal"
      @close="selected_id = null"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Spinner from '@common/LoadingSpinner.vue'
  import Icon from '@common/Icon.vue'
  import ProductInfo from './ProductInfo.vue'

  export default {
    name: 'ProductsMain',
    components: {
      Spinner,
      Icon,
      ProductInfo
    },
    async created () {
      await this.load()
    },
    data () {
      return {
        selected_id: null
      }
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
      },
      openProductInfo ( id ) {
        this.selected_id = id
        this.$refs['product-info-modal'].open(id)
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
