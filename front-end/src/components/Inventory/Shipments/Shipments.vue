<template>
  <div>
    <Spinner v-if="loading"/>
    <div v-else>
      {{ shipments }}
    </div>
  </div>
</template>

<script>
import { displayDate } from '@utils/date.js'
import { mapState } from 'vuex'
import Spinner from '@common/LoadingSpinner.vue'
import Icon from '@common/Icon.vue'

export default {
  name: 'ShipmentsMain',
  async created () {
    await this.load()
  },
  components: {
    Spinner,
    Icon
  },
  computed: {
    ...mapState({
      shipments: state => state.shipments.shipment_list,
      loading: state => state.shipments.loading
    })
  },
  methods: {
    displayDate,
    async load () {
      await this.$store.dispatch('shipments/listShipments')
    }
  }
}
</script>
