export default function ({ params, /* , route */ redirect }) {
  // シートのトップページの時、リダイレクト
  if (params.sheet && !params.sentence) {
    redirect(301, `/${params.sheet}/文章1/`)
  }
}
