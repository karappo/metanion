<template lang="pug">
.root
  header
    h1
      nuxt-link(to='/') metanion β
    nuxt-link.helpLink(to='/help/') Help ？
  main
    Nuxt/
</template>

<style lang="sass" scoped>
@import ~assets/style/const
.root
  min-height: 100vh
header
  height: $header_height
  background-color: $color_main
  display: flex
  align-items: center
  color: white
  h1
    margin-left: 15px
    margin-right: auto
  .helpLink
    margin-left: auto
    margin-right: 15px
    font-size: 12px
main
  min-height: calc(100vh - #{$header_height})
  display: flex
  justify-content: center
  align-items: center
h1
  font-size: 30px
</style>
