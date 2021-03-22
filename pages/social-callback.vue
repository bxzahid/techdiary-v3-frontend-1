<template>
  <div class='flex items-center justify-center h-full mt-32'>
    <div class='sk-chase'>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
    </div>
  </div>
</template>

<script>
export default {
  mode: 'spa',
  auth: 'guest',
  middleware: 'auth',
  mounted() {
    this.$router.replace('/')
  },
  async fetch() {
    this.$auth.$storage.setCookie('_token.local', `Bearer ${this.$route.query?.token}`)
    this.$auth.fetchUser()
  }
}
</script>

