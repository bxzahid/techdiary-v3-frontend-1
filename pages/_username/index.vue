<template>
  <main class='col-span-12 md:col-span-9 md:px-4'>
    <div>
      <p
        class='font-mono text-xs font-semibold text-gray-500 dark:text-gray-400'
      >
        ~/techdiary/{{ user && user.username }}/README.md
      </p>

      <div class='readme-content dark:bg-gray-800'>
        <div
          class='content-typography'
          v-html='user && user.profile_readme'
        ></div>
      </div>
    </div>
  </main>
</template>
<script>


import { mapState } from 'vuex'

export default {
  layout: 'publicuserdashboard',
  computed: {
    ...mapState({ user: (state) => state.publicUser.user })
  },
  head() {
    return {
      title: this.user?.username,
      bodyAttrs: {
        class: 'bg-gray-100 dark:bg-gray-700'
      }
    }
  }
  // async asyncData({ $axios, params, error }) {
  //   try {
  //     const { data: user } = await $axios.$get(`/api/user/${params.username}`)
  //     if (user.profile_readme) {
  //       user.profile_readme = md(user.profile_readme)
  //     }
  //     return { user }
  //   } catch (e) {
  //     error({
  //       statusCode: e.response.status,
  //       message: e.response.data.message,
  //     })
  //   }
  // },
}
</script>
