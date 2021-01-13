<template lang="pug">
table
  tr(v-for="row in sheet")
    td(v-for="(col, idx) in row.values" :key="idx" v-if="idx != 0")
      | {{ col.formattedValue }}
</template>

<script>
import _find from 'lodash/find'
import _ from 'lodash'
import _take from 'lodash/take'
import _tail from 'lodash/tail'
export default {
  async asyncData({ $axios, params, redirect }) {
    try {
      // eslint-disable-next-line
      const gss = await $axios.$get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/?key=${process.env.API_KEY}&includeGridData=true`)
      const sheet = _find(gss.sheets, {
        properties: { sheetId: params.sheet * 1 }
      }).data[0].rowData
      // ----------------
      // データの整形
      const head = _take(sheet)[0].values.map((el) => {
        return el.formattedValue
      })
      const body = _tail(sheet)
      // そのままの構造で素直にデータ化
      const answers = body.map((row) => {
        const obj = {
          before: {},
          after: {}
        }
        row.values.forEach((el, idx) => {
          const key = head[idx]
          const val = el.formattedValue
          const _key = key.match(/\[(.+)\]/)
          if (/前/.test(key)) {
            obj.before[_key[1]] = parseInt(val, 10)
          } else if (/後/.test(key)) {
            obj.after[_key[1]] = parseInt(val, 10)
          }
          // TODO ここで各値の個数のバリデーションできるかも
        })
        return obj
      })
      // 文章ごとにグループ化したデータ
      const answersBySentence = {}
      _.keys(answers[0].before).forEach((sentenceKey) => {
        const before = answers.map((a) => {
          return a.before[sentenceKey]
        })
        const after = answers.map((a) => {
          return a.after[sentenceKey]
        })
        answersBySentence[sentenceKey] = {
          before,
          after
        }
      })
      return { sheet, answers, answersBySentence }
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
