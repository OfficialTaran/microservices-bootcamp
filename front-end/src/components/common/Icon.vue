<template>
  <div>
    <b-icon
      class="mx-1 clickable"
      variant="info"
      :icon="icon"
      font-scale="1.5"
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
    }
  }
}
</script>