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
            class="font-mono text-sm font-semibold text-gray-500 dark:text-gray-400"
          >
            ~/techdiary/{{ user.username }}/diaries.json
          </p>

          <div class="mt-4 readme-content dark:bg-gray-800">
            <div
              class="flex mb-4 transition-all duration-500 ease-in-out rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              v-for="article in articles"
              :key="article.id"
            >
              <div class="ml-3">
                <h3 class="text-lg text-gray-700 dark:text-gray-100">
                  <nuxt-link
                    :to="{
                      name: 'username-articleSlug',
                      params: {
                        username: article.user.username,
                        articleSlug: article.slug,
                      },
                    }"
                    >{{ article.title }}</nuxt-link
                  >
                </h3>
                <p
                  class="mt-3 text-sm font-bold text-gray-600 dark:text-gray-200"
                >
                  {{ $moment(article.created_at).format('LLLL') }}
                </p>
              </div>
            </div>
            <div v-observe-visibility="visibilityChanged" />
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
      bodyAttrs: {
        class: 'bg-gray-100 dark:bg-gray-700',
      },
    }
  },
  data: () => ({
    articles: [],
    pageMeta: {
      current_page: 1,
      last_page: null,
    },
  }),
  async asyncData({ $axios, params, error }) {
    try {
      const { data: user } = await $axios.$get(`/api/user/${params.username}`)

      const {
        data: articles,
        meta: { current_page, last_page },
      } = await $axios.$get(`/api/articles?user=${params.username}`)

      if (user.profile_readme) {
        user.profile_readme = md(user.profile_readme)
      }

      return { user, articles, pageMeta: { current_page, last_page } }
    } catch (e) {
      error({
        statusCode: e.response?.status,
        message: e.response?.data.message,
      })
    }
  },
  methods: {
    async loadMore() {
      const { data } = await this.$axios.$get(
        `/api/articles?user=${this.$route.params.username}&page=${this.pageMeta.current_page}`
      )
      this.articles.push(...data)
    },
    async visibilityChanged(isVisible) {
      if (!isVisible) {
        return
      }

      if (this.pageMeta.currentPage >= this.pageMeta.lastPage) {
        return
      }
      this.pageMeta.current_page++

      await this.loadMore()
    },
  },
}
</script>
