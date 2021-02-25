<template lang="pug">
.wrap
  .content
    h1 文章{{ $route.params.sentence }}
    .question(:class="{wide: transformVisibility}")
      p {{ questionText }}
    .graph(v-if="answers")
      .before
        h2
          img(src="~/assets/image/before.svg")
        .dotsWrap
          Dots(:data="answers.count.before" :reverse="true")
      .center
        template(v-if="transformVisibility")
          PointAxis
          .transform
            TransformGraph(:data="answers.transform")
            TransformInfo(
              :denominator="answers.before.length"
              :molecular="answers.transform.length"
              :up1="answers.transform.filter((o) => o.difference === 1).length"
              :up2="answers.transform.filter((o) => o.difference === 2).length"
              :up3="answers.transform.filter((o) => o.difference === 3).length"
              :up4="answers.transform.filter((o) => o.difference === 4).length"
              :down1="answers.transform.filter((o) => o.difference === -1).length"
              :down2="answers.transform.filter((o) => o.difference === -2).length"
              :down3="answers.transform.filter((o) => o.difference === -3).length"
              :down4="answers.transform.filter((o) => o.difference === -4).length"
            )
          PointAxis
        template(v-else)
          PointAxis
      .after
        h2
          img(src="~/assets/image/after.svg")
        .dotsWrap
          Dots.dots(:data="answers.count.after" :transform="answers.transform")
  Footer(:transformVisibility="transformVisibility" @toggleTransformVisibility="transformVisibility = !transformVisibility")
</template>

<style lang="sass" scoped>
@import ~assets/style/const

.wrap
  width: 100%
  min-height: 100vh
  display: flex
  flex-wrap: nowrap
  flex-direction: column
.content
  width: 100%
  flex-grow: 3
  display: flex
  flex-direction: column
  justify-content: center
  margin: 30px 0
.table
  width: 400px
  margin: 0 auto 30px
h1
  text-align: center
  margin: 0 auto
  font-size: 22px
.question
  position: relative
  margin: 15px auto 30px
  width: 1030px
  &.wide
    width: 1812px
  &:before,
  &:after
    content: ''
    width: 100%
    height: 1px
    background: url(~assets/image/dotline-horizontal.svg)
    background-repeat: repeat-x
    position: absolute
    left: 0
  &:before
    top: 0
  &:after
    bottom: 0
  p
    width: 580px
    margin: 20px auto
    font-size: 26px
    line-height: 49px
    font-weight: bold
.graph
  color: #999999
  max-width: 1920px
  width: 100%
  margin: 0 auto
  display: flex
  > *
    display: flex
    align-items: center
  .before,
  .after
    display: block
    position: relative
    width: calc((100% - 70px) / 2)
    max-width: 450px // 18px x 25
    h2
      position: absolute
      top: 10px
      margin: 0
    .dotsWrap
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      display: flex
      align-items: center
  .before
    margin-left: auto
    margin-right: 0
    background-image: url(~assets/image/before-axis.svg)
    background-repeat: no-repeat
    background-position: right 77px top 76px
    h2
      left: 0
    .dotsWrap
      justify-content: flex-end
  .after
    margin-left: 0
    margin-right: auto
    background-image: url(~assets/image/after-axis.svg)
    background-repeat: no-repeat
    background-position: left 76px top 76px
    h2
      right: 0
    .row
      margin-right: auto
  .transform
    height: 100%
    display: flex
    flex-direction: column
    justify-content: flex-end
    margin: 0 14px
</style>

<script>
import _find from 'lodash/find'
import PointAxis from '~/assets/image/point-axis.svg?inline'
export default {
  components: {
    PointAxis
  },
  data() {
    return {
      transformVisibility: false,
      points: ['2', '1', '0', '-1', '-2']
    }
  },
  computed: {
    answers() {
      return this.$store.state.answers
        ? this.$store.state.answers[this.sentenceIndex]
        : null
    },
    questionText() {
      // 先頭の数字を撮って文章だけにして返す
      return this.answers
        ? this.answers.question
            .replace(/^[①-㊿]/, '') // 先頭の丸数字を削除
            .replace(/^[0-9]+\./, '') // 先頭の 1. を削除
            .trim()
        : null
    },
    sentenceIndex() {
      return this.$route.params.sentence - 1
    },
    sheet() {
      return this.$store.state.gss
        ? _find(this.$store.state.gss.sheets, {
            properties: { sheetId: this.$store.state.sheetId * 1 }
          })
        : null
    }
  },
  mounted() {
    this.$store.commit('sheetId', this.$route.params.sheet)
  }
}
</script>
