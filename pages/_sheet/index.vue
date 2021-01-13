<template lang="pug">
table
  tr(v-for="row in $store.state.sheet")
    td(v-for="(col, idx) in row.values" :key="idx" v-if="idx != 0")
      | {{ col.formattedValue }}
</template>

<style lang="sass">
table
  td
    background-color: #eee
</style>

<script>
export default {
  mounted() {
    this.$store.commit('sheetId', this.$route.params.sheet)
  }
}
</script>
