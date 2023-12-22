<template>
  <div>
    <Spinner v-if="loading"/>
    <div
      v-else
      class="mx-5 mt-3"
    >
      <b-card
        v-for="(item,key) in orders"
        :key="`list_item_${key}`"
        class="mt-2"
      >
        <div class="d-flex justify-content-between">
          {{ item }}
        </div>
      </b-card>
    </div>
    <OrderInfo
      ref="order-info-modal"
    />
  </div>
</template>

<script>

import { mapState } from 'vuex'
import OrderInfo from './OrderInfo.vue'
import Spinner from '@common/LoadingSpinner.vue'

export default {
  name: 'OrdersMain',
  async created () {
    await this.load()
  },
  components: {
    OrderInfo,
    Spinner
  },
  computed: {
    ...mapState({
      orders: state => state.orders.order_list,
      loading: state => state.orders.loading_orders
    })
  },
  methods: {
    async load () {
      await this.$store.dispatch('orders/listOrders')
    },
    async openOrderModal ( id ) {
      this.$refs['order-info-modal'].open(id)
    }
  }
}
</script>
