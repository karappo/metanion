export default async function ({ params, redirect, store }) {
  if (!store.state.gss) {
    const gss = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/?key=${process.env.API_KEY}&includeGridData=true`
    ).then((res) => res.json())
    // _で始まるシートのデータを削除
    gss.sheets = gss.sheets.filter((sheet) => {
      return !sheet.properties.title.startsWith('_')
    })
    store.commit('gss', gss)
  }

  // TODOここも整理（直接処理にできないか？）
  // もし、下層ページでsheetIdが指定されていたら、もう一度登録してスキップされた処理を行う
  if (store.state.sheetId != null) {
    store.commit('sheetId', store.state.sheetId)
  }

  // シートのトップページの時、リダイレクト
  if (params.sheet && !params.sentence) {
    redirect(301, `/${params.sheet}/1/`)
  }
}
