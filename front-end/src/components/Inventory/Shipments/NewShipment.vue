<template>
  <b-modal
    ref="new-shipment-modal"
    size="lg"
    title="New Shipment"
    :ok-disabled="!updates"
    @ok="submitNewShipment"
  >
    {{ shipment }}
    <Spinner
      v-if="posting"
      small
    />
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'
import Spinner from '@common/LoadingSpinner.vue'


export default {
  name: 'NewShipment',
  components: {
    Spinner
  },
  computed: {
    ...mapState({
      shipment: state => state.shipments.shipment,
      posting: state => state.shipments.posting_new_shipment
    })
  },
  data() {
    return {
      fields: [
        { key: 'product_id' },
        { key: 'unit_quantity' },
        { key: 'remove_button', label: '', class: 'button-column' }
      ]
    }
  },
  methods: {
    open () {
      this.$refs['new-shipment-modal'].show()
      this.$store.commit('shipments/startNewShipment')
    }
  }
}

</script>
<style scoped>
.button-column {
  width: 10%;
}
</style>