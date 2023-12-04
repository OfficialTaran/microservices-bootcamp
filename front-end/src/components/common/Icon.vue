<template>
  <div
    v-b-tooltip.hover
    :title="tooltip"
  >
    <b-icon
      class="mx-1 clickable"
      :variant="variant"
      :icon="icon"
      :font-scale="scale"
      @click="$emit('click')"
    />
  </div>
</template>

<script>
export default {
  name: 'DefaultIcon',
  props: {
    icon: {
      type: String,
      default: 'exclamation-circle-fill'
    },
    tooltip: {
      type: String,
      default: ''
    },
    scale: {
      type: String,
      default: '1'
    },
    variant: {
      type: String,
      default: 'dark'
    }
  }
}
</script>