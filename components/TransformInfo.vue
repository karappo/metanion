<template lang="pug">
.transformInfo
  .col
    .row
      .label
        .dot.pink
        .dot.blue
        span 移動数
      .value
        span.big {{ molecular }}
        span.small / {{ denominator }}
    .row
      .label
        span 移動率
      .value
        span.big {{ rate }}
        span.small %
  .col
    .row
      .label
        .dot.pink
        span 賛成方向に移動
        .big {{ up1 + up2 + up3 + up4}}
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
    .row
      .label
        .dot.blue
        span 反対方向に移動
        .big {{ down1 + down2 + down3 + down4}}
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
.dot
  width: 10px
  height: 10px
  border-radius: 5px
  &.pink
    background-color: $color_pink
  &.blue
    background-color: $color_blue

.transformInfo
  height: 94px
  padding: 32px 0 0
  display: flex
  align-items: stretch
  .col
    display: flex
    align-items: stretch
    flex-direction: column
    font-size: 15px
    color: #808080
    padding: 0 10px
  .col:nth-of-type(1)
    width: 180px
    flex-grow: 0
    .label
      width: 77px
      flex-shrink: 0
      .dot.blue
        margin-left: 3px
      span
        flex-grow: 3
        text-align: right
    .value
      margin-left: 20px
      .big
        @extend %helvetica_l
        font-size: 36px
        color: #666666
      .small
        margin-left: 7px
  .col:nth-of-type(2)
    background-image: url(~assets/image/dotline-vertical.svg)
    background-repeat: repeat-y
    background-position: left top
    flex-grow: 3
    padding-left: 20px
    .label
      margin-right: 10px
      span
        margin-left: 7px
      .big
        margin-left: 7px
        @extend %helvetica_l
        color: #666666
        font-size: 36px
        min-width: 42px
        text-align: right
  .row
    display: flex
    align-items: center
    height: 50%
  .label
    display: flex
    align-items: center
  .unit
    display: flex
    align-items: center
    >img
      margin-left: 10px
    >span
      margin-left: 10px
      @extend %helvetica_l
      font-size: 24px
      color: #333333
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
