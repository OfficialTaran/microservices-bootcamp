<template>
  <div>
     <b-modal
        ref="info-modal"
        @ok="$emit('close')"
        :title="loading ? null : product.name"
        ok-only
      >
        <div>{{ product }}</div>
        <div>{{ product_info }}</div>
      </b-modal> 
  </div>
</template>
    
<script>
import { mapState } from 'vuex'

export default {
  name: 'ProductInfo',
  computed: {
    ...mapState({
      product: state => state.products.product,
      loading: state => state.products.product_loading
    }),
    dimensions () {
      return [
        {
          label: 'Length',
          value: this.product.nominal_dimensions ? this.product.nominal_dimensions.length: null
        },
        {
          label: 'Thickness',
          value: this.product.nominal_dimensions ? this.product.nominal_dimensions.thickness: null
        },
        {
          label: 'Width',
          value: this.product.nominal_dimensions ? this.product.nominal_dimensions.width: null
        }
      ]
    },
    product_info () {
      return [
        {
          label: 'Product ID',
          value: this.product.id
        },
        {
          lable: 'In Stock',
          value: this.product.in_stock
        }
      ]
    }
  },
  methods: {
    open ( id ) {
      this.$store.dispatch('products/getProduct', { id })
      this.$refs['info-modal'].show()
    }
  }
}
</script>