<template>
  <div>
     <b-modal
        ref="info-modal"
        @ok="$emit('close')"
        :title="loading ? null : product.name"
        ok-only
      >
        {{ product }}
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
    })
  },
  methods: {
    open ( id ) {
      this.$store.dispatch('products/getProduct', { id })
      this.$refs['info-modal'].show()
    }
  }
}
</script>