<template lang="pug">
.content
  ExternalLink.gssLink(:href="gssLinkURI()" targe='_blank')
    img.icon(src='~assets/image/google-sheets.svg')
  .wrap
    h2(v-if="sheet()") {{ sheet().properties.title }}
    h1 {{ $route.params.sentence }}
    .graph(v-if="answers()")
      .before
        .dots
          .row(v-for="p in points")
            .dot(v-for="i in (answers().count.before[p] || 0)")
        .points
          .row(v-for="p in points")
            .point {{ 0 < p * 1 ? `+${p}` : p }}
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
      .after
        .points
          .row(v-for="p in points")
            .point {{ 0 < p * 1 ? `+${p}` : p }}
        .dots
          .row(v-for="p in points")
            .dot(v-for="i in (answers().count.after[p] || 0)")
  .sentences
    nuxt-link(
      v-for="(v, k, i) in $store.state.answers"
      :key="k"
      :to="`/${$store.state.sheetId}/${k}/`"
      :class="{current: decodeURI($route.fullPath) === `/${$route.params.sheet}/${k}/`}"
    ) {{ i + 1 }}
</template>

<style lang="sass" scoped>
.content
  width: 100%
  min-height: calc(100vh - 60px)
  position: relative
  display: flex
  justify-content: center
  align-items: center
  background: white
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
h1,
h2
  text-align: center
  width: 50%
  margin-left: auto
  margin-right: auto
.graph
  font-family: helvetica
  color: #999999
  max-width: 1920px
  width: calc(100% - 60px)
  margin: 0 auto
  display: flex
  flex-wrap: nowrap
  align-items: center
  .before,
  .after
    width: calc((100% - 70px) / 2)
    max-width: 400px // 20px x 20
    height: 100%
    display: flex
  .before
    justify-content: flex-end
    margin-left: auto
    margin-right: 0
    .row
      flex-direction: row-reverse
      margin-left: auto
  .after
    margin-left: 0
    margin-right: auto
    .row
      margin-right: auto
  .row
    margin: 32px auto
    height: 48px
    display: flex
    flex-direction: row
    align-items: center
    flex-wrap: wrap
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
import _find from 'lodash/find'
import { ExternalLink } from '@karappo-inc/vue-components'
export default {
  components: {
    ExternalLink
  },
  data() {
    return {
      points: ['2', '1', '0', '-1', '-2']
    }
  },
  mounted() {
    this.$store.commit('sheetId', this.$route.params.sheet)
  },
  methods: {
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
    }
  }
}
</script>
