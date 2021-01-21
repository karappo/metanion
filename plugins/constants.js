import Vue from 'vue'

Vue.prototype.$const = {
  spreadsheetURI: `https://docs.google.com/spreadsheets/d/${process.env.SPREADSHEET_ID}/edit`
}
