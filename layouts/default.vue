<template>
  <main>
    <Navbar />
    <Nuxt />
  </main>
</template>

<script>
export default {
  head: () => ({
    bodyAttrs: {
      class: 'techdiary-body'
    }
  }),
  mounted() {
    this.$auth.fetchUser()
  }
}
</script>
