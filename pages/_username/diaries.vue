<template>
  <main>
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
              >{{ article.title }}
            </nuxt-link>
          </h3>
          <p class="mt-3 text-sm font-bold text-gray-600 dark:text-gray-200">
            {{ $moment(article.created_at).format('LLLL') }}
          </p>
        </div>
      </div>
      <div class="grid mt-4 place-content-center">
        <loader-spin v-if="$fetchState.pending" />
      </div>
      <div v-observe-visibility="visibilityChanged" />
    </div>
  </main>
</template>
<script>
import { mapState } from 'vuex'

export default {
  layout: 'profile',
  data: () => ({
    articles: [],
    pageMeta: {
      current_page: 1,
      last_page: null,
    },
  }),
  computed: {
    ...mapState({ user: (state) => state.publicUser.user }),
  },
  async fetch() {
    try {
      const {
        data: articles,
        meta: { current_page, last_page },
      } = await this.$axios.$get(
        `/api/articles?user=${this.$route.params.username}`
      )
      this.articles = articles
      this.pageMeta = { current_page, last_page }
    } catch (e) {
      this.$nuxt.error({
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
