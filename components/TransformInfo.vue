<template lang="pug">
.transformInfo
  .left
    .up
      .dot.pink
      .dot.blue
      | 移動数
      span.big {{ transformCount }}
      span.small /{{ total }}
    .down
      | 移動率
      span.big {{ transformRate }}
      span.small %
  .right
    .up
      .dot.pink
      | 賛成方向に移動
    .down
      .dot.blue
      | 反対方向に移動

</template>

<style lang="sass" scoped>
@import ~assets/style/const
.transformInfo
  height: 94px
  padding: 17px 0
  display: flex
  align-items: stretch
.dot
  width: 10px
  height: 10px
  border-radius: 5px
  &.pink
    background-color: $color_pink
  &.blue
    background-color: $color_blue

.left,
.right
  display: flex
  align-items: stretch
  flex-direction: column
  font-size: 15px
  color: #808080
.left
  width: 215px
.right
  background-image: url(~assets/image/dotline-vertical.svg)
  background-repeat: repeat-y
  background-position: left top
.up,
.down
  display: flex
  align-items: center
  height: 50%
.big
  font-size: 36px
  font-family: helvetica
  font-weight: 400
</style>

<script>
export default {
  props: {
    total: {
      default: 0,
      type: Number
    },
    transformCount: {
      default: 0,
      type: Number
    }
  },
  computed: {
    transformRate() {
      return Math.round((this.transformCount / this.total) * 100)
    }
  }
}
</script>
