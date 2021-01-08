<template lang="pug">
ul
  li(v-for="sheet in ss.sheets")
    nuxt-link(:to="`?sheetId=${sheet.properties.sheetId}`") {{ sheet.properties.title }}
</template>

<script>
// https://sheets.googleapis.com/v4/spreadsheets/1lu3DbgrhnZYCKT7KuwaZB0Y9VnMH-Vwxf-y2BstPLOM/?key=AIzaSyDcC0YMmCcMid6GjWbfQYFm314mQZ9f-WY&includeGridData=true
export default {
  async asyncData({ $axios }) {
    const spreadsheetId = '1lu3DbgrhnZYCKT7KuwaZB0Y9VnMH-Vwxf-y2BstPLOM'
    const yourAPIKey = 'AIzaSyDcC0YMmCcMid6GjWbfQYFm314mQZ9f-WY'
    // eslint-disable-next-line
    const ss = await $axios.$get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/?key=${yourAPIKey}&includeGridData=true`)
    return { ss }
  },
  mounted() {
    console.log('mounted')
  },
  head() {
    return {
      script: [
        {
          src: 'https://apis.google.com/js/api.js',
          async: true,
          defer: true
        }
      ]
    }
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
</style>
