<template lang="pug">
.transformGraph
  .unit(
    v-for="t in data"
    v-if="t.difference !== 0"
    :data-before="t.before"
    :data-after="t.after"
    :data-difference="t.difference"
  )
    .dot
    .dot
</template>

<style lang="sass">
@import ~assets/style/const
.transformGraph
  $height: 102px

  display: flex
  align-items: flex-end
  justify-content: space-around
  width: 700px
  height: #{$height * 4 + 2px} // 画像が切れないように+2pxしている
  background-image: url(~assets/image/transform-background.svg)
  background-repeat: no-repeat
  background-position: center
  .unit
    background: $color_pink
    display: flex
    flex-direction: column
    justify-content: space-between
  .dot
    width: 12px
    height: 12px
    border-radius: 100%
    display: flex
    justify-content: center
    align-items: center
    font-size: 9px
    &:nth-child(1) // before
      background-color: white
  @for $i from 1 to 4
    .unit[data-difference='#{$i}']
      flex-direction: column-reverse
      height: #{$height * $i}
      background: linear-gradient(lighten($color_pink, 10%), lighten($color_pink, 50%))
      @for $i from -2 to 2
        &[data-before='#{$i}']
          margin-bottom: #{$height * ($i + 2)}
      .dot
        border: 1px solid lighten($color_pink, 20%)
        &:nth-child(2) // after
          background-color: $color_pink
          border-color: $color_pink
  @for $i from 1 to 4
    .unit[data-difference='-#{$i}']
      height: #{$height * $i}
      background: linear-gradient(lighten($color_blue, 50%), lighten($color_blue, 10%))
      @for $i from -2 to 2
        &[data-before='#{$i}']
          align-self: flex-start
          margin-top: #{$height * (2 - $i)}
      .dot
        border: 1px solid lighten($color_blue, 20%)
        &:nth-child(2) // after
          background-color: $color_blue
          border-color: $color_blue
  .dot
    margin: -7px 0
  span
    margin: 0 10px
    display: flex
    align-items: center
    flex-wrap: nowrap
</style>

<script>
export default {
  props: {
    data: null
  }
}
</script>
