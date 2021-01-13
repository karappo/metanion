<template lang="pug">
.index
  nuxt-child
  .sentences
    nuxt-link(v-for="(v, k) in answersBySentence"  :key="k" :to="`/${sheetId}/${k}/`") {{ k }}
</template>

<script>
import _find from 'lodash/find'
import _keys from 'lodash/keys'
import _take from 'lodash/take'
import _tail from 'lodash/tail'
export default {
  async asyncData({ $axios, params, redirect }) {
    try {
      const sheetId = params.sheet * 1
      // eslint-disable-next-line
      const gss = await $axios.$get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/?key=${process.env.API_KEY}&includeGridData=true`)
      const sheet = _find(gss.sheets, {
        properties: { sheetId }
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
      _keys(answers[0].before).forEach((sentenceKey) => {
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
      return { sheetId, sheet, answers, answersBySentence }
    } catch (e) {
      console.error(e)
      // TODO エラー表示
      redirect('/')
    }
  }
}
</script>

<style lang="sass">
.index
  width: 100%
  min-height: calc(100vh - 60px)
  display: flex
  justify-content: center
  align-items: center
  position: relative
.sentences
  text-align: center
  position: absolute
  bottom: 30px
  a + a
    margin-left: 15px
</style>
