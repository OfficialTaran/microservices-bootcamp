<template>
  <div>
     <b-modal
        ref="info-modal"
        :title="loading ? null : product.name"
      >
        {{ product }}
        <Spinner
          v-if="updating"
          small
        />
      </b-modal> 
  </div>
</template>
    
<script>
import { mapState } from 'vuex'
import { isEqual } from 'lodash'
import Spinner from '@common/LoadingSpinner.vue'
// import ModalInput from '@common/ModalInput.vue'

export default {
  name: 'ProductInfo',
  components: {
    Spinner
  },
  computed: {
    ...mapState({
      product: state => state.inventoryProducts.product,
      product_original: state => state.inventoryProducts.product_original,
      loading: state => state.inventoryProducts.product_loading,
      updating: state => state.inventoryProducts.updating_product
    }),
    dimensions () {
      return [
        {
          label: 'Length',
          value: this.product.nominal_dimensions ? this.product.nominal_dimensions.length : null,
          dimension: 'length'
        },
        {
          label: 'Thickness',
          value: this.product.nominal_dimensions ? this.product.nominal_dimensions.thickness : null,
          dimension: 'thickness'
        },
        {
          label: 'Width',
          value: this.product.nominal_dimensions ? this.product.nominal_dimensions.width : null,
          dimension: 'width'
        }
      ]
    },
    properties () {
      return [
      {
          label: 'Display Name',
          value: this.product.name,
          property: 'name',
          type: 'text'
        },
        {
          label: 'Unit Quantity',
          value: this.product.unit_quantity,
          property: 'unit_quantity',
          type: 'number'
        },
        {
          label: 'In Stock',
          value: this.product.in_stock,
          property: 'in_stock',
          type: 'number'
        }
      ]
    },
    updates () {
      return ! isEqual(this.product, this.product_original)
    }
  },
  methods: {
    open (id = null) {
      this.$store.dispatch('inventoryProducts/getProduct', { id })
      this.$refs['info-modal'].show()
    }
  }
}
</script>
