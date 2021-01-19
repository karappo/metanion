<template lang="pug">
div
  h2 {{ this.$route.params.sentence }}の回答の変化
  table.answers(v-if="answers")
    thead
      tr
        th Before
        th →
        th After
    tbody
      tr
        td
        td 賛成
        td
      tr(v-for="hyouka in ['2', '1', '0', '-1', '-2']")
        td.gray {{ answers.before[hyouka] || 0 }}
        td {{ hyouka }}
        td.gray {{ answers.after[hyouka] || 0 }}
      tr
        td
        td 反対
        td
</template>

<style lang="sass">
h2
  text-align: center
table.answers
  width: 100%
  td
    text-align: center
    width: 35%
    &
      background-color: #eee
    &:nth-child(2)
      width: 30%
      background-color: white
      font-weight: bold
  tr:last-child,
  tr:first-child
    td
      background-color: white
</style>

<script>
export default {
  computed: {
    answers() {
      if (!this.$store.state.answersBySentence) {
        return null
      }
      // 答えの値ごとにカウントする
      const toCountDict = function (array) {
        if (!Array.isArray(array)) {
          array = Object.values(array)
        }
        const dict = {}
        for (const key of array) {
          dict[key] = array.filter((x) => {
            return x === key
          }).length
        }
        return dict
      }
      // eslint-disable-next-line
      const answers = this.$store.state.answersBySentence[this.$route.params.sentence]
      answers.before = toCountDict(answers.before)
      answers.after = toCountDict(answers.after)
      return answers
    }
  }
}
</script>
