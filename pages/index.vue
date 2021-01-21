<template lang="pug">
.container
  h3 ビジュアライズしたいアンケートを選択
  .sheets(v-if="this.$store.state.gss")
    nuxt-link.sheetLink(v-for="(sheet, idx) in this.$store.state.gss.sheets" v-if="!/^_/.test(sheet.properties.title)" :to="`/${sheet.properties.sheetId}/`" :key="idx") {{ sheet.properties.title }}
</template>

<style lang="sass" scoped>
@import ~assets/style/const
h3
  font-size: 20px
  text-align: center
.sheets
  min-width: 400px
.sheetLink
  display: block
  border: 3px solid #ccc
  color: #ccc
  border-radius: 5px
  margin: 5px
  padding: 20px
  display: flex
  align-items: center
  &:after
    content: '▶'
    color: #ccc
    margin-left: auto
    margin-right: 0
  &:hover
    border-color: $color_main
    color: $color_main
    &:after
      color: $color_main
</style>
