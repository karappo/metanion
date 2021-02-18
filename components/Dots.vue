<template lang="pug">
.dots
  .row(v-for="p in ['2', '1', '0', '-1', '-2']")
    .dot(v-for="i in (data[p] ? data[p].total - data[p].plus - data[p].minus : 0)")
    .dot.plus(v-for="i in (data[p] ? data[p].plus : 0)")
    .dot.minus(v-for="i in (data[p] ? data[p].minus : 0)")
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
    &.plus
      background-color: $color_pink
    &.minus
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
