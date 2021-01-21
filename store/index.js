import _find from 'lodash/find'
import _keys from 'lodash/keys'
import _take from 'lodash/take'
import _tail from 'lodash/tail'

export const state = () => ({
  gss: null,
  sheetId: null,
  sheet: null,
  answers: null
})

// 文章ごとにグループ化
const groupBySentence = (data) => {
  const res = {}
  _keys(data[0].before).forEach((sentenceKey) => {
    const before = data.map((a) => {
      return a.before[sentenceKey]
    })
    const after = data.map((a) => {
      return a.after[sentenceKey]
    })
    res[sentenceKey] = {
      before,
      after
    }
  })
  return res
}
// 答えの値ごとにカウント
const toCountDict = function (obj) {
  // arrayに変換
  const array = !Array.isArray(obj) ? Object.values(obj) : obj
  const dict = {}
  for (const key of array) {
    dict[String(key)] = array.filter((x) => {
      return x === key
    }).length
  }
  return dict
}

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

    // sheetIdが更新されたら、answersも更新する
    // つまり、常にひとつのシート文のanswersしか持たない（パフォーマンス的に望ましい）
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
    let answers = body
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

    answers = groupBySentence(answers)

    for (const property in answers) {
      const _answers = answers[property]
      // Cleanup: 大量にNaNが含まれているのでここで除去
      for (const key in _answers) {
        _answers[key] = _answers[key].filter((x) => Number.isInteger(x))
      }
      // 前後の結果に表示する単純なカウントを保持
      _answers.count = {
        before: toCountDict(_answers.before),
        after: toCountDict(_answers.after)
      }
    }
    // Update
    state.sheet = sheet
    state.answers = answers
  },
  sheet(state, val) {
    state.sheet = val
  },
  answers(state, val) {
    state.answers = val
  }
}
