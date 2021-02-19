<template lang="pug">
.dots
  .row(v-for="p in ['2', '1', '0', '-1', '-2']" :title="data[p] ? data[p].total : '不明'")
    .dot(v-for="i in (data[p] ? data[p].total - data[p].up - data[p].down : 0)")
    .dot.up(v-for="i in (data[p] ? data[p].up : 0)")
    .dot.down(v-for="i in (data[p] ? data[p].down : 0)")
</template>

<style lang="sass">
@import ~assets/style/const
.dots
  .dot
    width: 12px
    height: 12px
    border-radius: 100%
    margin: 3px
    background-color: $color_gray
    &.up
      background-color: $color_pink
    &.down
      background-color: $color_blue
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
