<template>
  <div>
     <b-modal
        ref="info-modal"
        @ok="$emit('close')"
        size="lg"
        ok-only
      >
        <ModalInput
          v-for="(item, key) in properties"
          :key="`property_item_${key}`"
          :loading="loading"
          :label="item.label"
          :value="item.value"
        />
        <b-table
          v-if="!loading"
          striped
          hover
          class="mt-4"
          :items="order.goods_ordered"
        />
      </b-modal> 
  </div>
</template>
    
<script>
import { mapState } from 'vuex'
import { displayDate } from '@utils/date.js'
import ModalInput from '@common/ModalInput.vue'

export default {
  name: 'OrderInfo',
  components: {
    ModalInput
  },
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
