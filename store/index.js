import _find from 'lodash/find'
import _keys from 'lodash/keys'
import _take from 'lodash/take'
import _tail from 'lodash/tail'

export const state = () => ({
  gss: null,
  sheetId: null,
  sheet: null,
  answers: null,
  answersBySentence: null
})

export const mutations = {
  gss(state, val) {
    state.gss = val
  },
  sheetId(state, val) {
    state.sheetId = val

    if (state.gss == null) {
      return
    }

    // sheetIdが更新されたら、answersやanswersBySentenceも更新する
    const sheets = JSON.parse(JSON.stringify(state.gss.sheets))
    const sheet = _find(sheets, {
      properties: { sheetId: val * 1 }
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

    // Update
    state.sheet = sheet
    state.answers = answers
    state.answersBySentence = answersBySentence
    console.log('update', state.sheet)
  },
  sheet(state, val) {
    state.sheet = val
  },
  answers(state, val) {
    state.answers = val
  },
  answersBySentence(state, val) {
    state.answersBySentence = val
  }
}

// export const getters = {
//   answersBySentence(state) {
//     return state.answersBySentence
//   }
// }
