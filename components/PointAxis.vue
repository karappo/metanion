<template lang="pug">
.pointAxis
  .row
    .label 賛成
  .row(v-for="p in points")
    .point {{ 0 < p * 1 ? `+${p}` : p }}
  .row
    .label 反対
</template>

<style lang="sass">
.pointAxis
  position: relative
  width: 83px
  background-color: rgba(0,0,255,0.1)
  &::after
    position: absolute
    content: ''
    display: block
    width: 3px
    height: calc(100% - 108px)
    background-color: #B3B3B3
    top: 54px
    left: calc(50% - 1px)
    z-index: -1
  .row
    justify-content: center
    &:first-of-type,
    &:last-of-type
      height: 54px
      flex-direction: column
.point
  font-family: helvetica
  font-size: 23px
  font-weight: bold
  color: #808080
  width: 68px
  height: 48px
  background-color: white
  border: 3px solid #999999
  border-radius: 4px
  display: flex
  justify-content: center
  align-items: center
.label
  background: #666666
  color: white
  font-size: 25px
  border-radius: 4px
  width: 83px
  height: 54px
  display: flex
  justify-content: center
  align-items: center
</style>

<script>
export default {
  data() {
    return {
      points: ['2', '1', '0', '-1', '-2']
    }
  }
}
</script>
