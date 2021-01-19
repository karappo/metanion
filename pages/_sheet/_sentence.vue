<template lang="pug">
div
  h2 {{ this.$route.params.sentence }}の回答の変化
  div.answers(v-if="answers")
    .before
      table
        tr(v-for="a in answers.before")
          td
            | {{ a }}
    .arrow →
    .after
      table
        tr(v-for="a in answers.after")
          td
            | {{ a }}
</template>

<style lang="sass">
h2
  text-align: center
.answers
  display: flex
  flex-direction: row
  align-items: center
  .after
    margin-left: 10px
  .arrow
    padding: 0 20px
  table
    width: 100px
    td
      background-color: #ccc
      text-align: center
</style>

<script>
export default {
  computed: {
    answers() {
      return this.$store.state.answersBySentence
        ? this.$store.state.answersBySentence[this.$route.params.sentence]
        : null
    }
  }
}
</script>
