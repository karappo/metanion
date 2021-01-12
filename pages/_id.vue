<template lang="pug">
table
  tr(v-for="row in sheet")
    td(v-for="(col, idx) in row.values" v-if="idx != 0")
      | {{ col.formattedValue }}
</template>

<script>
import _find from 'lodash/find'

const SPREADSHEET_ID = '1lu3DbgrhnZYCKT7KuwaZB0Y9VnMH-Vwxf-y2BstPLOM'
const API_KEY = 'AIzaSyDcC0YMmCcMid6GjWbfQYFm314mQZ9f-WY'

export default {
  async asyncData({ $axios, params, redirect }) {
    // eslint-disable-next-line
    const gss = await $axios.$get(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/?key=${API_KEY}&includeGridData=true`)
    if (gss) {
      const sheet = _find(gss.sheets, {
        properties: { sheetId: params.id * 1 }
      }).data[0].rowData

      return { sheet }
    } else {
      redirect('/')
    }
  }
}
</script>

<style lang="sass">
table
  td
    background-color: #eee
</style>
