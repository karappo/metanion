<template lang="pug">
.pointAxis
  .row(v-for="p in points")
    .point {{ 0 < p * 1 ? `+${p}` : p }}
</template>

<style lang="sass">
.point
  $border_width: 4px
  font-size: 23px
  font-weight: bold
  color: #808080
  border: $border_width solid #999999
  border-radius: 4px
  width: 68px
  height: calc(100% - #{$border_width * 2})
  margin: 0 12px
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
