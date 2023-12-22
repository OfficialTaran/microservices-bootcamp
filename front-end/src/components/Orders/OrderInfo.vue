<template>
  <div>
     <b-modal
        ref="info-modal"
        @ok="$emit('close')"
        size="lg"
        ok-only
      >
        {{ order }}
      </b-modal> 
  </div>
</template>
    
<script>
import { mapState } from 'vuex'
import { displayDate } from '@utils/date.js'

export default {
  name: 'OrderInfo',
  computed: {
    ...mapState({
      order: state => state.orders.order,
      loading: state => state.orders.order_loading
    }),
    properties () {
      return [
        {
          label: 'Order ID',
          value: this.order.id
        },
        {
          label: 'Order Date',
          value: displayDate(this.order.date_created)
        },
        {
          label: 'State',
          value: this.order.state
        }
      ]
    }
  },
  methods: {
    open ( id ) {
      this.$store.dispatch('orders/getOrder', { id })
      this.$refs['info-modal'].show()
    }
  }
}
</script>
