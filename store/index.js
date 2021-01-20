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

    // TODO 必ずgssがあるようにしたい
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
    const answers = body
      .filter((row) => row.values !== undefined) // rowがundefinedのものが交じる場合があるので削除 TODO もっと早い段階（sheetsとか？）で行ったほうがよい？
      .map((row) => {
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
    // 答えの値ごとにカウントする
    const toCountDict = function (obj) {
      // arrayに変換
      const array = (!Array.isArray(obj)
        ? Object.values(obj)
        : obj
      ).filter((x) => Number.isInteger(x))
      const dict = {}
      for (const key of array) {
        dict[String(key)] = array.filter((x) => {
          return x === key
        }).length
      }
      return dict
    }
    for (const property in answersBySentence) {
      const answers = answersBySentence[property]
      answers.before = toCountDict(answers.before)
      answers.after = toCountDict(answers.after)
    }

    // Update
    state.sheet = sheet
    state.answers = answers
    state.answersBySentence = answersBySentence
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
