<template lang="pug">
.container
  h1 使い方
  h2 フォームを作って、スプレッドシートと紐付ける
  ol
    li
      nuxt-link(to='https://docs.google.com/forms/') Google Forms
      | より、新しいフォームを作成
    li
      | 「回答」タブより「回答先の選択」から「既存のスプレッドシートを選択」より、
      nuxt-link(to='https://docs.google.com/spreadsheets/d/1lu3DbgrhnZYCKT7KuwaZB0Y9VnMH-Vwxf-y2BstPLOM/edit') Metanion Answers
      | を選択
    li 紐付けられたシートにわかりやすい名前をつける（日付など見分けをつけやすいように）
  h2 対話をしてもらい、前後で回答をまとめる
  ol
    li 対話前、9つの文書を読み、回答をしてもらう
    li 対話をしてもらう
    li 対話後、改めて回答を記録してもらう
    li 先程作ったGoogle Formsのページから、対話前・対話後それぞれの回答を入力してもらう

  h2 結果の確認
  ol
    li トップページから先ほどフォームと紐付けたシートを選択
    li 回答の結果画面が表示される
</template>

<script></script>

<style lang="sass" scoped>
@import ~assets/style/const
.container
  width: 600px
  display: flex
  flex-direction: column
h1
  width: 100%
  text-align: center
h2:not(:first-child)
  margin-top: 2em
ol
  li + li
    margin-top: 1.5em
</style>
