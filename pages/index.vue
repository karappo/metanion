<template lang="pug">
div
  ul
    li(v-for="sheet in gss.sheets")
      nuxt-link(:to="`/${sheet.properties.sheetId}`") {{ sheet.properties.title }}
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

<style lang="sass">
.container
  margin: 0 auto
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
  text-align: center

table
  td
    background-color: #eee
</style>
