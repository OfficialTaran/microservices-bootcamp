<template>
  <div class="mt-5 mx-5">
    <div class="d-flex justify-content-between">
      <b-nav pills class="mb-5">
        <b-nav-item 
          v-for="(item, key) in pages"
          :key="`info_item_${key}`"
          :active="selected_page === item.name"
          @click="selected_page = item.name"
        >
          {{ item.display }}
        </b-nav-item>
      </b-nav>
    </div>
    <Shipments 
      v-if="selected_page === 'shipments'"
      ref="shipments"
    />
  </div>
</template>
  
<script>

import Shipments from './Shipments/Shipments.vue'

export default {
  name: 'InventoryMain',
  components: {
    Shipments
  },
  data() {
    return {
      pages: [
        {
          name: 'shipments',
          display: 'Shipments'
        },
        {
          name: 'products',
          display: 'Products'
        },
        {
          name: 'order_picking',
          display: 'Order Picking'
        },
        {
          name: 'order_pickup',
          display: 'Order Pickup'
        }
      ],
      selected_page: 'shipments'
    }
  }
}
</script>