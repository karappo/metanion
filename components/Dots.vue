<template lang="pug">
.dots
  .row(v-for="p in ['2', '1', '0', '-1', '-2']")
    .dot(v-for="i in (data[p] || 0)")
</template>

<style lang="sass">
.dots
  .dot
    width: 12px
    height: 12px
    border-radius: 100%
    margin: 3px
    background-color: #999999
</style>

<script>
export default {
  props: {
    data: {
      default: null,
      type: Object
    }
  }
}
</script>
