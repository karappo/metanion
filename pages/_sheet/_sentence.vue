<template lang="pug">
.wrap
  .content
    // TODO 数字を取得する
    h1 文章1
    p.question {{ questionText() }}
    .graph(v-if="answers()")
      .before
        .dots
          .row(v-for="p in points")
            .dot(v-for="i in (answers().count.before[p] || 0)")
      .center
        template(v-if="showTransform")
          PointAxis
          .transform
            .unit(
              v-for="t in answers().transform"
              v-if="t.difference !== 0"
              :data-before="t.before"
              :data-after="t.after"
              :data-difference="t.difference"
            )
              .dot
              .dot
          PointAxis
        template(v-else)
          PointAxis
      .after
        .dots
          .row(v-for="p in points")
            .dot(v-for="i in (answers().count.after[p] || 0)")
  footer
    .left
      nuxt-link(to="/").logotype
        Logotype
    .center
      .pages
        nuxt-link(
          v-for="(v, k, i) in $store.state.answers"
          :key="k"
          :to="`/${$store.state.sheetId}/${k}/`"
          :class="{current: decodeURI($route.fullPath) === `/${$route.params.sheet}/${k}/`}"
        )
          span {{ i + 1 }}
    .right
      a.toggleButton(@click="toggle")
        IconClose(v-if="showTransform")
        IconOpen(v-else)
      ExternalLink.gssLink(v-if="sheet()" :href="gssLinkURI()" targe='_blank') {{ sheet().properties.title }}
</template>

<style lang="sass">
$footer_inner_height: 69px

.wrap
  width: 100%
  height: 100%
  display: flex
  flex-wrap: wrap
  flex-direction: column
.content
  width: 100%
  height: calc(100vh - #{$footer_inner_height + 1px})
.table
  width: 400px
  margin: 0 auto 30px
h1
  text-align: center
  margin: 53px auto 0
  font-size: 22px
.question
  max-width: 580px
  margin: 0 auto
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
    background-position: 44px 15px
    padding-left: 50px
    .row
      flex-direction: row-reverse
      margin-left: auto
  .after
    margin-left: 0
    margin-right: auto
    background-image: url(~assets/image/after-axis.svg)
    background-repeat: no-repeat
    background-position: 78px 15px
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
    $red: #EF68B6
    $blue: #68DAEF
    $height: 79px

    display: flex
    align-items: flex-end
    justify-content: space-around
    width: 800px
    height: #{$height * 4}
    .unit
      background: $red
      display: flex
      flex-direction: column
      justify-content: space-between
    .dot
      width: 12px
      height: 12px
      display: flex
      justify-content: center
      align-items: center
      font-size: 9px
      &:nth-child(1) // before
        background-color: white
    @for $i from 1 to 4
      .unit[data-difference='#{$i}']
        flex-direction: column-reverse
        height: #{$height * $i}
        background: linear-gradient(lighten($red, 10%), lighten($red, 50%))
        @for $i from -2 to 2
          &[data-before='#{$i}']
            margin-bottom: #{$height * ($i + 2)}
        .dot
          border: 1px solid lighten($red, 20%)
          &:nth-child(2) // after
            background-color: $red
            border-color: $red
    @for $i from 1 to 4
      .unit[data-difference='-#{$i}']
        height: #{$height * $i}
        background: linear-gradient(lighten($blue, 50%), lighten($blue, 10%))
        @for $i from -2 to 2
          &[data-before='#{$i}']
            align-self: flex-start
            margin-top: #{$height * (2 - $i)}
        .dot
          border: 1px solid lighten($blue, 20%)
          &:nth-child(2) // after
            background-color: $blue
            border-color: $blue
    .dot
      margin: -7px 0
    span
      margin: 0 10px
      display: flex
      align-items: center
      flex-wrap: nowrap
  .dot
    width: 12px
    height: 12px
    margin: 3px
    background-color: #999999
    border-radius: 7px
footer
  $center_width: 756px // 84 * 9 = 756

  height: $footer_inner_height
  border-top: 1px solid #CCCCCC
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
      showTransform: false,
      points: ['2', '1', '0', '-1', '-2']
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
    answers() {
      return this.$store.state.answers
        ? this.$store.state.answers[this.$route.params.sentence]
        : null
    },
    gssLinkURI() {
      return `${this.$const.spreadsheetURI}#gid=${this.$store.state.sheetId}`
    },
    questionText() {
      // 先頭の数字を撮って文章だけにして返す
      return this.$route.params.sentence
        .replace(/^[①-㊿]/, '') // 先頭の丸数字を削除
        .replace(/^[0-9]+\./, '') // 先頭の 1. を削除
        .trim()
    }
  }
}
</script>
