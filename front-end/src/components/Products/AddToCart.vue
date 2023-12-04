<template>
  <div>
     <b-modal
        ref="add-modal"
        title="Add To Cart"
      >
        <div class="d-flex flex-wrap justify-content-center">
          <b-form-input 
            v-model="quantity" 
            type="number"
            size="lg"
            class="w-50 px-3"
            min="1"
            :max="product.in_stock"
          />
        </div>
      </b-modal> 
  </div>
</template>
    
<script>
import { mapState } from 'vuex'

export default {
  name: 'AddToCart',
  props: {
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      quantity: 1
    }
  },computed: {
    ...mapState({
      product_list: state => state.products.product_list
    }),
    product () {
      return this.product_list.find(p => p.id === this.id) || {}
    }
  },
  methods: {
    open () {
      this.$refs['add-modal'].show()
    }
  }
}
</script>
