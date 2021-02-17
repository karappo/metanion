<template lang="pug">
.transformInfo
  .left
    .total
      .dot.pink
      .dot.blue
      | 移動数
      span.big 24
      span.small /40
    .rate
      | 移動率
      span.big 60
      span.small %
  .right
    .dot.pink
    | 賛成方向に移動
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
.left
  width: 215px
.right
  background-image: url(~assets/image/dotline-vertical.svg)
  background-repeat: repeat-y
  background-position: left top
</style>
