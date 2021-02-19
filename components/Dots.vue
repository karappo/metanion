<template lang="pug">
.dots
  .row(v-for="p in ['2', '1', '0', '-1', '-2']" :title="data[p] ? data[p].total : '不明'" :class="{ reverse }")
    .dot(v-for="i in (data[p] ? data[p].total - data[p].up - data[p].down : 0)")
    .dot.up(v-for="i in (data[p] ? data[p].up : 0)")
    .dot.down(v-for="i in (data[p] ? data[p].down : 0)")
</template>

<style lang="sass">
@import ~assets/style/const
.dots
  .row
    margin: 54px auto
    height: 48px
    display: flex
    flex-direction: row
    align-items: center
    flex-wrap: wrap
    &.reverse
      flex-direction: row-reverse
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
    },
    reverse: {
      defatul: false,
      type: Boolean
    }
  }
}
</script>
