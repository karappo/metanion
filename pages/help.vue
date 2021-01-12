<template lang="pug">
.container
  h1 使い方
  h2 フォームの作り方
  ol
    li
      nuxt-link(to='https://docs.google.com/forms/') Google Forms
      | より、新しいフォームを作成
    li
      | 「回答」タブより「回答先の選択」から「既存のスプレッドシートを選択」より、
      nuxt-link(to='https://docs.google.com/spreadsheets/d/1lu3DbgrhnZYCKT7KuwaZB0Y9VnMH-Vwxf-y2BstPLOM/edit#gid=1979632471') Metanion Answers
      | を選択
</template>

<script></script>

<style lang="sass" scoped>
@import ~assets/style/const
.container
  min-width: 400px
  display: flex
  flex-direction: column
h1
  width: 100%
  text-align: center
</style>
