<script>
export default {
  fetch({ params, redirect }) {
    redirect(301, `/${params.sheet}/文章1/`)
  }
}
</script>
