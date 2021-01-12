<template lang="pug">
.container
  .sheets
    nuxt-link.sheetLink(v-for="sheet in gss.sheets" :to="`/${sheet.properties.sheetId}/`") {{ sheet.properties.title }}
</template>

<script>
const SPREADSHEET_ID = '1lu3DbgrhnZYCKT7KuwaZB0Y9VnMH-Vwxf-y2BstPLOM'
const API_KEY = 'AIzaSyDcC0YMmCcMid6GjWbfQYFm314mQZ9f-WY'

export default {
  watchQuery: ['sheetId'],
  async asyncData({ $axios }) {
    // eslint-disable-next-line
    const gss = await $axios.$get(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/?key=${API_KEY}&includeGridData=true`)
    return { gss }
  }
}
</script>

<style lang="sass" scoped>
@import ~assets/style/const
.sheets
  min-width: 400px
.sheetLink
  display: block
  border: 1px solid #ccc
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
