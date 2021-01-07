<template lang="pug">
  .container
    | ほげ
</template>

<script>
// https://sheets.googleapis.com/v4/spreadsheets/1lu3DbgrhnZYCKT7KuwaZB0Y9VnMH-Vwxf-y2BstPLOM/?key=AIzaSyDcC0YMmCcMid6GjWbfQYFm314mQZ9f-WY&includeGridData=true
export default {
  // async asyncData({ $axios }) {
  //   const spreadsheetId = '1lu3DbgrhnZYCKT7KuwaZB0Y9VnMH-Vwxf-y2BstPLOM'
  //   const yourAPIKey = 'AIzaSyDcC0YMmCcMid6GjWbfQYFm314mQZ9f-WY'
  //   console.log('---------------')
  //   // eslint-disable-next-line
  //   const res = await $axios.$get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/?key=${yourAPIKey}&includeGridData=true`)
  //   console.log(res)
  //   return { res }
  // },
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
