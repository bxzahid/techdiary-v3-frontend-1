<template>
  <div class="flex items-center justify-center min-h-[50vh]">
    <loader-spin />
  </div>
</template>

<script>
export default {
  mode: 'spa',
  auth: 'guest',
  middleware: 'auth',
  head: {
    title: 'একটু অপেক্ষা করুন',
  },
  mounted() {
    this.$router.replace('/')
  },
  async fetch() {
    this.$auth.$storage.setCookie(
      '_token.local',
      `Bearer ${this.$route.query?.token}`
    )
    this.$auth.fetchUser()
  },
}
</script>
