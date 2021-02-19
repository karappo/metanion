<template lang="pug">
.transformInfo
  .left
    .up
      .dot.pink
      .dot.blue
      | 移動数
      span.big {{ molecular }}
      span.small /{{ denominator }}
    .down
      | 移動率
      span.big {{ rate }}
      span.small %
  .right
    .up
      .label
        .dot.pink
        span 賛成方向に移動
      .unit
        img(src="~/assets/image/up1.svg")
        span {{ up1 }}
      .unit
        img(src="~/assets/image/up2.svg")
        span {{ up2 }}
      .unit
        img(src="~/assets/image/up3.svg")
        span {{ up3 }}
      .unit
        img(src="~/assets/image/up4.svg")
        span {{ up4 }}
    .down
      .label
        .dot.blue
        span 反対方向に移動
      .unit
        img(src="~/assets/image/down1.svg")
        span {{ down1 }}
      .unit
        img(src="~/assets/image/down2.svg")
        span {{ down2 }}
      .unit
        img(src="~/assets/image/down3.svg")
        span {{ down3 }}
      .unit
        img(src="~/assets/image/down4.svg")
        span {{ down4 }}
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
  .unit
    >img
      margin-left: 10px
    >span
      margin-left: 10px
.big
  font-size: 36px
  font-family: helvetica
  font-weight: 400
</style>

<script>
export default {
  props: {
    // 分母（参加者総数）
    denominator: {
      default: 0,
      type: Number
    },
    // 分子（移動数）
    molecular: {
      default: 0,
      type: Number
    },
    // 賛成の方向に移動
    up1: {
      default: 0,
      type: Number
    },
    up2: {
      default: 0,
      type: Number
    },
    up3: {
      default: 0,
      type: Number
    },
    up4: {
      default: 0,
      type: Number
    },
    // 反対の方向に移動
    down1: {
      default: 0,
      type: Number
    },
    down2: {
      default: 0,
      type: Number
    },
    down3: {
      default: 0,
      type: Number
    },
    down4: {
      default: 0,
      type: Number
    }
  },
  computed: {
    rate() {
      return Math.round((this.molecular / this.denominator) * 100)
    }
  }
}
</script>
