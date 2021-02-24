<template lang="pug">
footer(
  @mouseover="mouseover"
  @mouseleave="mouseleave"
  @click="showNav"
  v-click-outside="hideNav"
)
  .title(v-if="sheet") {{ sheet.properties.title }}
  transition(name='slide')
    nav(v-if="navVisibility")
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
        .rest
          a.toggleButton(@click="$emit('toggleTransformVisibility')")
            IconClose(v-if="transformVisibility")
            IconOpen(v-else)
        ExternalLink.gssLink(v-if="sheet" :href="gssLinkURI" targe='_blank') {{ sheet.properties.title }}
</template>

<style lang="sass">
@import ~assets/style/const
.slide-enter-active,
.slide-leave-active
  transition: transform .3s
  transform: translateY(0)
.slide-enter,
.slide-leave-active
  transition: transform 1s
  transform: translateY(70px)

a
  transition: opacity 0.2s
  &:not(.current):hover
    transition: opacity 0.2s
    opacity: 0.7
  &.current
    cursor: default
footer
  height: 70px
  background-color: white
  position: relative
  overflow: hidden
  .title
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    z-index: 1
  nav
    position: absolute
    top: 0
    left: 0
    z-index: 2
    width: 100%
    height: calc(100% - 1px)
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
        height: 100%
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
        height: 100%
        a
          display: flex
          align-items: center
          height: 100%
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
            @extend %helvetica_m
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
      .rest
        display: flex
        align-items: center
        justify-content: center
        height: 100%
        flex-grow: 1
        .toggleButton
          display: flex
          align-items: center
          justify-content: center
          height: 100%
          width: 69px
          cursor: pointer
      .gssLink
        height: 100%
        flex-grow: 0
        display: flex
        align-items: center
        font-size: 16px
        justify-content: flex-end
        width: auto
        text-overflow: ellipsis
        white-space: nowrap
</style>

<script>
import _find from 'lodash/find'
import ClickOutside from 'vue-click-outside'
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
  directives: {
    ClickOutside
  },
  props: {
    transformVisibility: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      navVisibility: true,
      hover: false,
      autoHideTimer: null // 自動でフッターを隠すタイマー
    }
  },
  computed: {
    gssLinkURI() {
      return `${this.$const.spreadsheetURI}#gid=${this.$store.state.sheetId}`
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
    this.autoHideTimer = setTimeout(this.hideNav, 3000)
  },
  methods: {
    mouseover() {
      this.hover = true
      if (this.autoHideTimer) {
        clearTimeout(this.autoHideTimer)
        this.autoHideTimer = null
      }
      this.showNav()
    },
    mouseleave() {
      this.hover = false
      this.autoHideTimer = setTimeout(this.hideNav, 3000) // 一瞬エリア外に出ることもあるので、遅延させる
    },
    showNav() {
      this.navVisibility = true
    },
    hideNav() {
      if (!this.hover) {
        this.navVisibility = false
      }
    }
  }
}
</script>
