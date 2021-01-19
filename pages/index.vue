<template lang="pug">
.container
  h3 ビジュアライズしたいアンケートを選択
  .sheets(v-if="this.$store.state.gss")
    nuxt-link.sheetLink(v-for="(sheet, idx) in this.$store.state.gss.sheets" :to="`/${sheet.properties.sheetId}/`" :key="idx") {{ sheet.properties.title }}
  ExternalLink.gssLink(href='https://docs.google.com/spreadsheets/d/1lu3DbgrhnZYCKT7KuwaZB0Y9VnMH-Vwxf-y2BstPLOM/edit#gid=1990567556' targe='_blank')
    img.icon(src='~assets/image/google-sheets.svg')
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
.gssLink
  position: absolute
  bottom: 20px
  right: 20px
  display: flex
  flex-direction: column
  align-items: center
  font-size: 13px
  border-bottom: 0
  .icon
    width: 80px
    height: auto
</style>

<script>
import { ExternalLink } from '@karappo-inc/vue-components'
export default {
  components: {
    ExternalLink
  }
}
</script>
