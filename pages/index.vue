<template lang="pug">
.container
  img(src="~assets/image/logo.png" srcset="~assets/image/logo.png 1x, ~assets/image/logo@2x.png 2x")
  ExternalLink.help(href="https://docs.google.com/document/d/1wSAPXohNnF5o42wEkVlBjWn9I17vawxKf5gU6_VnKHQ/") 取扱説明書
  template(v-if="$store.state.gss")
    h3 シートを選択してください
    .sheets
      nuxt-link.sheetLink(v-for="(sheet, idx) in $store.state.gss.sheets" v-if="!/^_/.test(sheet.properties.title)" :to="`/${sheet.properties.sheetId}/`" :key="idx") {{ sheet.properties.title }}
  template(v-else)
    h3 エラー：表示可能なシートがありません
</template>

<style lang="sass" scoped>
@import ~assets/style/const
.container
  display: flex
  flex-wrap: wrap
  flex-direction: column
  margin: 30px
.help
  font-size: 16px
  font-weight: bold
  width: auto
  margin: 18px 0 18px auto
h3
  font-size: 18px
  margin: 50px 0 20px 0
.sheetLink
  display: block
  color: #666666
  padding: 20px
  display: flex
  align-items: center
  border: 1px solid #707070
  font-size: 16px
  &:hover
    background: #E6E6E6
.sheetLink + .sheetLink
  margin-top: 12px
</style>

<script>
import { ExternalLink } from '@karappo-inc/vue-components'
export default {
  components: {
    ExternalLink
  }
}
</script>
