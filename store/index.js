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
  const res = []
  _keys(data[0].before).forEach((sentenceKey, index) => {
    const before = data.map((a) => {
      return a.before[sentenceKey]
    })
    const after = data.map((a) => {
      return a.after[sentenceKey]
    })
    res.push({
      question: sentenceKey,
      before,
      after
    })
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
// 変化の方向でグルーピング
const groupByTransformation = (data, transformData = null) => {
  const result = {}
  if (transformData) {
    for (const key in data) {
      const _data = transformData.filter((o) => o.after === key * 1)
      const plus = _data.filter((o) => 0 < o.difference).length
      const minus = _data.filter((o) => o.difference < 0).length
      result[key] = {
        total: data[key],
        plus,
        minus
      }
    }
  } else {
    for (const key in data) {
      result[key] = {
        total: data[key],
        plus: 0,
        minus: 0
      }
    }
  }
  return result
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
    for (const index in answers) {
      const _answers = answers[index]

      // Cleanup: 大量にNaNが含まれているのでここで除去
      _answers.before = _answers.before.filter((x) => Number.isInteger(x))
      _answers.after = _answers.after.filter((x) => Number.isInteger(x))

      // 意見の変化（transform）のデータ化
      _answers.transform = []
      _answers.before.forEach((v, i) => {
        const difference = _answers.after[i] - v
        if (difference !== 0) {
          _answers.transform.push({
            index: i,
            before: v,
            after: _answers.after[i],
            difference
          })
        }
      })

      // 前後の結果に表示する単純なカウントを３色分に分けて保持
      _answers.count = {
        before: groupByTransformation(toCountDict(_answers.before)),
        after: groupByTransformation(
          toCountDict(_answers.after),
          _answers.transform
        )
      }
    }
    // Update
    state.sheet = sheet
    state.answers = answers
  }
}
