<template>
  <p>Please wait ...</p>
</template>

<script>
export default {
  mode: 'spa',
  async asyncData({ app, query, redirect }) {
    app.$auth.$storage.setCookie('_token.local', `Bearer ${query?.token}`)
    app.$auth.fetchUser()
    redirect('/')
  },
}
</script>
