<template lang="pug">
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
    a.toggleButton(@click="$emit('toggleShowTransform')")
      IconClose(v-if="showTransform")
      IconOpen(v-else)
    ExternalLink.gssLink(v-if="sheet()" :href="gssLinkURI()" targe='_blank') {{ sheet().properties.title }}
</template>

<style lang="sass">
footer
  height: 69px
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
    display: flex
    align-items: center
    width: 756px // 84 * 9 = 756
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
      height: 100%
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
export default {
  components: {
    ExternalLink,
    IconClose,
    IconOpen,
    Logotype
  },
  props: {
    showTransform: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    sheet() {
      return this.$store.state.gss
        ? _find(this.$store.state.gss.sheets, {
            properties: { sheetId: this.$store.state.sheetId * 1 }
          })
        : null
    },
    gssLinkURI() {
      return `${this.$const.spreadsheetURI}#gid=${this.$store.state.sheetId}`
    }
  }
}
</script>
