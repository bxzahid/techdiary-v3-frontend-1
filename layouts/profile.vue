<template>
  <main>
    <Navbar />
    <div class="wrapper">
      <div class="grid grid-cols-12">
        <user-profile-sidebar-info :user="user" />
        <!-- Main Content -->
        <main class="col-span-12 md:col-span-9 md:px-4">
          <div
            class="min-h-screen p-4 bg-white rounded shadow dark:bg-gray-800 dark:text-white"
          >
            <user-profile-tabs :username="user && user.username" />
            <Nuxt />
          </div>
        </main>
      </div>
    </div>
    <footer class="grid mb-4 place-content-center">
      <div class="mb-2">
        <nuxt-link
          :to="{ name: 'pages-slug', params: { slug: 'privacy-policy' } }"
          class="text-sm text-gray-600"
        >
          Privacy Policy
        </nuxt-link>

        <span class="seperator"> · </span>

        <nuxt-link
          :to="{ name: 'pages-slug', params: { slug: 'terms-and-conditions' } }"
          class="text-sm text-gray-600"
        >
          Terms & Conditions
        </nuxt-link>
        <span class="seperator"> · </span>

        <nuxt-link
          :to="{ name: 'pages-slug', params: { slug: 'about' } }"
          class="text-sm text-gray-600"
        >
          About Us
        </nuxt-link>
      </div>
    </footer>
  </main>
</template>

<script>
import md from '~/mixins/MarkdownParser'

export default {
  head() {
    return {
      title: this.user?.username,
      bodyAttrs: {
        class: 'bg-gray-100 dark:bg-gray-700',
      },
    }
  },
  data() {
    return {
      user: null,
    }
  },
  async fetch() {
    try {
      const { data: user } = await this.$axios.$get(
        `/api/user/${this.$route.params.username}`
      )
      this.user = user

      if (this.user.profile_readme) {
        this.user.profile_readme = md(this.user.profile_readme)
      }
      this.$store.commit('publicUser/SET_USER', this.user)
    } catch (e) {
      this.$nuxt.error({
        statusCode: e.response?.status,
        message: e.response?.data.message,
      })
    }
  },
}
</script>
