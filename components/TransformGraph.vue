<template lang="pug">
.transformGraph
  .unit(
    v-for="t in data"
    v-if="t.difference !== 0"
    :data-before="t.before"
    :data-after="t.after"
    :data-difference="t.difference"
  )
    .line
    .dots
      .dot
      .dot
</template>

<style lang="sass">
@import ~assets/style/const
.transformGraph
  $height: 102.5px

  display: flex
  align-items: flex-end
  justify-content: space-around
  width: 700px
  height: 410px
  background-image: url(~assets/image/transform-background.svg)
  background-repeat: no-repeat
  background-position: center
  .unit
    position: relative
    width: 12px
    .line
      height: 100%
      width: 6px
      margin: 0 auto
    .dots
      position: absolute
      top: 0
      left: 0
      height: 100%
      width: 100%
      display: flex
      flex-direction: column
      justify-content: space-between
      .dot
        width: 10px
        height: 10px
        border: 1px solid transparent
        border-radius: 100%
        display: flex
        justify-content: center
        align-items: center
        font-size: 9px
        margin: -6px 0
        &:nth-child(1) // before
          background-color: white
  @for $i from 1 to 4
    .unit[data-difference='#{$i}']
      height: #{$height * $i}
      .line
        background: linear-gradient(lighten($color_pink, 10%), lighten($color_pink, 50%))
      @for $i from -2 to 2
        &[data-before='#{$i}']
          margin-bottom: #{$height * ($i + 2)}
      .dots
        flex-direction: column-reverse
      .dot
        border-color: lighten($color_pink, 20%)
        &:nth-child(2) // after
          background-color: $color_pink
          border-color: $color_pink
  @for $i from 1 to 4
    .unit[data-difference='-#{$i}']
      height: #{$height * $i}
      .line
        background: linear-gradient(lighten($color_blue, 50%), lighten($color_blue, 10%))
      @for $i from -2 to 2
        &[data-before='#{$i}']
          align-self: flex-start
          margin-top: #{$height * (2 - $i)}
      .dot
        border-color: lighten($color_blue, 20%)
        &:nth-child(2) // after
          background-color: $color_blue
          border-color: $color_blue
</style>

<script>
export default {
  props: {
    data: {
      default: null,
      type: Array
    }
  }
}
</script>
