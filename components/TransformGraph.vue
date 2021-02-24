<template lang="pug">
.transformGraph
  .group(
    v-for="i in [2, 1, 0, -1, -2]"
    v-if="groupedData[i]"
  )
    .unit(
      v-for="t in groupedData[i]"
      :data-before="t.before"
      :data-after="t.after"
      :data-difference="t.difference",
      :class="{ shrinked }"
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
  justify-content: space-between
  width: 672px
  height: 410px
  background-image: url(~assets/image/transform-background.svg)
  background-repeat: no-repeat
  background-position: center
  .group
    display: flex
    align-items: flex-end
    height: 100%
  .unit
    position: relative
    width: 12px
    transition: height 1s ease-in-out
    &.shrinked
      height: 0 !important
    .line
      height: 100%
      width: 8px
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
  .unit + .unit
    margin-left: 3px
  @for $i from 1 to 4
    .unit[data-difference='#{$i}']
      height: #{$height * $i}
      .line
        background: linear-gradient(lighten($color_pink, 20%), lighten($color_pink, 50%))
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
      align-self: flex-start
      .line
        background: linear-gradient(lighten($color_blue, 50%), lighten($color_blue, 20%))
      @for $i from -2 to 2
        &[data-before='#{$i}']
          margin-top: #{$height * (2 - $i)}
      .dot
        border-color: lighten($color_blue, 20%)
        &:nth-child(2) // after
          background-color: $color_blue
          border-color: $color_blue
</style>

<script>
import _groupBy from 'lodash/groupBy'
import _sortBy from 'lodash/sortBy'
export default {
  props: {
    data: {
      default: null,
      type: Array
    }
  },
  data() {
    return {
      shrinked: true
    }
  },
  computed: {
    groupedData() {
      const _data = _groupBy(this.data, 'after') // 終着点でグルーピング
      // 変化の方向で並び替え（賛成方向→反対方向）
      for (const key in _data) {
        _data[key] = _sortBy(_data[key], 'difference').reverse()
      }
      return _data
    }
  },
  mounted() {
    setTimeout(() => {
      this.shrinked = false
    }, 0)
  }
}
</script>
