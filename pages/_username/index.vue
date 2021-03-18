<template>
  <div class="grid grid-cols-12">
    <user-profile-sidebar-info :user="user" />

    <!-- Main Content -->
    <main class="col-span-12 md:col-span-9 md:px-4">
      <div
        class="min-h-screen p-4 bg-white rounded shadow dark:bg-gray-800 dark:text-white"
      >
        <user-profile-tabs :username="user.username" />
        <div>
          <p
            class="font-mono text-xs font-semibold text-gray-500 dark:text-gray-400"
          >
            ~/techdiary/{{ user.username }}/README.md
          </p>

          <div class="readme-content markdown-body dark:bg-gray-800">
            <div class="markdown" v-html="user.profile_readme"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import md from '~/mixins/MarkdownParser'

export default {
  head() {
    return {
      title: this.user.username,
    }
  },
  async asyncData({ $axios, params, error }) {
    try {
      const { data: user } = await $axios.$get(`/api/user/${params.username}`)
      if (user.profile_readme) {
        user.profile_readme = md(user.profile_readme)
      }
      return { user }
    } catch (e) {
      error({
        statusCode: e.response.status,
        message: e.response.data.message,
      })
    }
  },
}
</script>
