<template lang="pug">
.container
  h3 ビジュアライズしたいシートを選択
  .sheets(v-if="$store.state.gss")
    nuxt-link.sheetLink(v-for="(sheet, idx) in $store.state.gss.sheets" v-if="!/^_/.test(sheet.properties.title)" :to="`/${sheet.properties.sheetId}/`" :key="idx") {{ sheet.properties.title }}
</template>

<style lang="sass" scoped>
@import ~assets/style/const
h3
  font-size: 20px
  text-align: center
.sheets
  min-width: 400px
.sheetLink
  background: white
  display: block
  color: #ccc
  border-radius: 5px
  margin: 5px
  padding: 20px
  display: flex
  align-items: center
  border: 0
  &:after
    content: '▶'
    color: #ccc
    margin-left: auto
    margin-right: 0
  &:hover
    color: $color_main
    &:after
      color: $color_main
</style>
