<template lang="pug">
.index
  nuxt-child
  .sentences
    nuxt-link(
      v-for="(v, k) in $store.state.answersBySentence"
      :key="k"
      :to="`/${$store.state.sheetId}/${k}/`"
      :class="{current: $route.fullPath === `/${$store.state.sheetId}/${k}/`}"
    ) {{ k }}
</template>

<style lang="sass">
.index
  width: 100%
  min-height: calc(100vh - 60px)
  display: flex
  justify-content: center
  align-items: center
  position: relative
.sentences
  text-align: center
  position: absolute
  bottom: 30px
  a + a
    margin-left: 15px
  a.current
    border-color: #546fff
</style>
