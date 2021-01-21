<template lang="pug">
.content
  ExternalLink.gssLink(:href="sheetURI()" targe='_blank')
    img.icon(src='~assets/image/google-sheets.svg')
  .wrap
    h2 {{ $route.params.sentence }}の回答の変化
    .graph(v-if="answers()")
      .row(v-for="point in ['2', '1', '0', '-1', '-2']")
        .before
          .dot(v-for="i in (answers().before[point] || 0)")
        .point {{ 0 < point * 1 ? `+${point}` : point }}
        .after
          .dot(v-for="i in (answers().after[point] || 0)")
  .sentences
    nuxt-link(
      v-for="(v, k) in $store.state.answersBySentence"
      :key="k"
      :to="`/${$store.state.sheetId}/${k}/`"
      :class="{current: decodeURI($route.fullPath) === `/${$route.params.sheet}/${k}/`}"
    ) {{ k }}
</template>

<style lang="sass">
.content
  width: 100%
  min-height: calc(100vh - 60px)
  position: relative
  display: flex
  justify-content: center
  align-items: center
.gssLink
  position: absolute
  bottom: 0
  right: 0
  display: flex
  flex-direction: column
  align-items: center
  font-size: 13px
  border-bottom: 0
  padding: 30px
  border-bottom: 0 !important
  z-index: 2
  .icon
    width: 40px
    height: auto
.wrap
  width: 100%
  height: 100%
.table
  width: 400px
  margin: 0 auto 30px
h2
  text-align: center
.graph
  font-family: helvetica
  color: #999999
  max-width: 1920px
  width: calc(100% - 60px)
  margin: 0 auto
  .row
    display: flex
    align-items: center
    margin: 32px auto
    height: 48px
  .before,
  .after
    width: calc((100% - 70px) / 2)
    max-width: 400px // 20px x 20
    height: 100%
    display: flex
    flex-direction: row
    align-items: center
    flex-wrap: wrap

  .before
    flex-direction: row-reverse
    margin-left: auto
  .after
    margin-right: auto
  .point
    font-size: 16px
    border: 1px solid #D9D9D9
    border-radius: 4px
    width: 70px
    height: 100%
    margin: 0 12px
    display: flex
    justify-content: center
    align-items: center
  .dot
    width: 14px
    height: 14px
    margin: 3px
    background-color: #999999
    border-radius: 7px
.sentences
  text-align: center
  position: absolute
  width: 100%
  bottom: 30px
  a + a
    margin-left: 15px
  a.current
    border-color: #546fff
</style>

<script>
import { ExternalLink } from '@karappo-inc/vue-components'
export default {
  components: {
    ExternalLink
  },
  mounted() {
    this.$store.commit('sheetId', this.$route.params.sheet)
  },
  methods: {
    answers() {
      return this.$store.state.answersBySentence
        ? this.$store.state.answersBySentence[this.$route.params.sentence]
        : null
    },
    sheetURI() {
      return `https://docs.google.com/spreadsheets/d/1lu3DbgrhnZYCKT7KuwaZB0Y9VnMH-Vwxf-y2BstPLOM/edit#gid=${this.$store.state.sheetId}`
    }
  }
}
</script>
