import _find from 'lodash/find'
export default async function ({ params, redirect, store }) {
  if (!store.state.gss) {
    const gss = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/?key=${process.env.API_KEY}&includeGridData=true`
    ).then((res) => res.json())
    store.commit('gss', gss)
  }

  // TODOここも整理（直接処理にできないか？）
  // もし、下層ページでsheetIdが指定されていたら、もう一度登録してスキップされた処理を行う
  if (store.state.sheetId != null) {
    store.commit('sheetId', store.state.sheetId)
  }

  // シートのトップページの時、リダイレクト
  if (params.sheet && !params.sentence) {
    const sheet = _find(store.state.gss.sheets, {
      properties: { sheetId: params.sheet * 1 }
    })
    const sentenceText = sheet.data[0].rowData[0].values[1].formattedValue.replace(
      /.*\[(.*)\].*/,
      '$1'
    )
    redirect(301, `/${params.sheet}/${sentenceText}/`)
  }
}
