<template lang="pug">
table
  tr(v-for="row in sheet")
    td(v-for="(col, idx) in row.values" :key="idx" v-if="idx != 0")
      | {{ col.formattedValue }}
</template>

<script>
import _find from 'lodash/find'
export default {
  async asyncData({ $axios, params, redirect }) {
    try {
      // eslint-disable-next-line
      const gss = await $axios.$get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/?key=${process.env.API_KEY}&includeGridData=true`)
      const sheet = _find(gss.sheets, {
        properties: { sheetId: params.id * 1 }
      }).data[0].rowData
      return { sheet }
    } catch (e) {
      console.error(e)
      // TODO エラー表示
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
