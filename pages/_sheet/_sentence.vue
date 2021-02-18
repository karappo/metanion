<template lang="pug">
.wrap
  .content
    h1 文章{{ $route.params.sentence }}
    p.question {{ questionText() }}
    .graph(v-if="answers")
      .before
        .dots
          .row(v-for="p in points")
            .dot(v-for="i in (answers.count.before[p] || 0)")
      .center
        template(v-if="showTransform")
          PointAxis
          .transform
            TransformGraph(:data="answers.transform")
            TransformInfo
          PointAxis
        template(v-else)
          PointAxis
      .after
        .dots
          .row(v-for="p in points")
            .dot(v-for="i in (answers.count.after[p] || 0)")
  footer
    .left
      nuxt-link(to="/").logotype
        Logotype
    .center
      .pages
        nuxt-link(
          v-for="(v, i) in $store.state.answers"
          :key="i"
          :to="`/${$store.state.sheetId}/${i + 1}/`"
          :class="{current: decodeURI($route.fullPath) === `/${$route.params.sheet}/${i + 1}/`}"
        )
          span {{ i + 1 }}
    .right
      a.toggleButton(@click="toggle")
        IconClose(v-if="showTransform")
        IconOpen(v-else)
      ExternalLink.gssLink(v-if="sheet()" :href="gssLinkURI()" targe='_blank') {{ sheet().properties.title }}
</template>

<style lang="sass">
@import ~assets/style/const

.wrap
  width: 100%
  height: 100vh
  display: flex
  flex-wrap: wrap
  flex-direction: column
.content
  width: 100%
  flex-grow: 3
  display: flex
  flex-direction: column
  justify-content: center
.table
  width: 400px
  margin: 0 auto 30px
h1
  text-align: center
  margin: 0 auto
  font-size: 22px
.question
  max-width: 580px
  margin: 0 auto 45px
  font-size: 26px
  line-height: 53px
  font-weight: bold
.graph
  color: #999999
  max-width: 1920px
  width: calc(100% - 60px)
  margin: 0 auto
  display: flex
  > *
    display: flex
    align-items: center
  .before,
  .after
    width: calc((100% - 70px) / 2)
    max-width: 450px // 18px x 25
  .before
    justify-content: flex-end
    margin-left: auto
    margin-right: 0
    background-image: url(~assets/image/before-axis.svg)
    background-repeat: no-repeat
    background-position: right 76px top 15px
    padding-left: 50px
    .row
      flex-direction: row-reverse
      margin-left: auto
  .after
    margin-left: 0
    margin-right: auto
    background-image: url(~assets/image/after-axis.svg)
    background-repeat: no-repeat
    background-position: left 78px top 15px
    padding-right: 50px
    .row
      margin-right: auto
  .row
    margin: 54px auto
    height: 48px
    display: flex
    flex-direction: row
    align-items: center
    flex-wrap: wrap
  .transform
    height: 100%
    display: flex
    flex-direction: column
    justify-content: flex-end
  .dots
    .dot
      width: 12px
      height: 12px
      border-radius: 100%
      margin: 3px
      background-color: #999999
footer
  $center_width: 756px // 84 * 9 = 756
  $footer_inner_height: 69px

  height: $footer_inner_height
  border-top: 1px solid #CCCCCC
  background: white
  margin: 0
  display: flex
  .left
    display: flex
    align-items: center
    width: 100%
    margin-left: 56px
    .logotype
      display: flex
      align-items: center
  .center
    // background: green
    display: flex
    align-items: center
    width: $center_width
    text-align: center
    margin-left: auto
    margin-right: auto
    .pages
      display: flex
      align-items: center
      a
        display: flex
        align-items: center
        &::before,
        &::after
          top: calc(50% - 6px)
          content: ''
          display: block
          height: 12px
          width: 1px
          background-color: #BFBFBF
        &:first-of-type::before
          left: 0
        &::after
          right: 0
        &.current::before,
        &.current::after
          background-color: white
        span
          display: flex
          justify-content: center
          align-items: center
          width: 82px
          height: 24px
        &.current
          z-index: 1
          span
            background-color: #999999
            color: white
      a + a
        margin-left: -1px
  .right
    display: flex
    align-items: center
    margin-right: 56px
    width: 100%
    .toggleButton
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      min-width: $footer_inner_height
      cursor: pointer
      margin: 0 auto
      flex-grow: 1
    .gssLink
      display: flex
      align-items: center
      font-size: 16px
      justify-content: flex-end
      width: auto
      flex-grow: 3
      text-overflow: ellipsis
      white-space: nowrap
</style>

<script>
import _find from 'lodash/find'
import { ExternalLink } from '@karappo-inc/vue-components'
import IconClose from '~/assets/image/close.svg?inline'
import IconOpen from '~/assets/image/open.svg?inline'
import Logotype from '~/assets/image/logotype.svg?inline'
import PointAxis from '~/assets/image/point-axis.svg?inline'
export default {
  components: {
    ExternalLink,
    IconClose,
    IconOpen,
    Logotype,
    PointAxis
  },
  data() {
    return {
      showTransform: true,
      points: ['2', '1', '0', '-1', '-2']
    }
  },
  computed: {
    sentenceIndex() {
      return this.$route.params.sentence - 1
    },
    answers() {
      return this.$store.state.answers
        ? this.$store.state.answers[this.sentenceIndex]
        : null
    }
  },
  mounted() {
    this.$store.commit('sheetId', this.$route.params.sheet)
  },
  methods: {
    toggle() {
      this.showTransform = !this.showTransform
    },
    sheet() {
      return this.$store.state.gss
        ? _find(this.$store.state.gss.sheets, {
            properties: { sheetId: this.$store.state.sheetId * 1 }
          })
        : null
    },
    gssLinkURI() {
      return `${this.$const.spreadsheetURI}#gid=${this.$store.state.sheetId}`
    },
    questionText() {
      // 先頭の数字を撮って文章だけにして返す
      return this.answers
        ? this.answers.question
            .replace(/^[①-㊿]/, '') // 先頭の丸数字を削除
            .replace(/^[0-9]+\./, '') // 先頭の 1. を削除
            .trim()
        : null
    }
  }
}
</script>
