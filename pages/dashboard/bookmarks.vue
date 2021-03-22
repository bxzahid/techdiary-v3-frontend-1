<template>
  <div v-if="$fetchState.pending">
    <div class="flex items-center justify-center h-full">
      <h1>Loading...</h1>
    </div>
  </div>
  <div v-else>
    <div
      class="flex py-2 mb-2 transition-all duration-500 ease-in-out rounded dark:hover:bg-gray-600 hover:bg-gray-100"
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
      </div>
    </div>
    <div
      v-if="!articles.length"
      class="flex items-center justify-center h-24 space-x-2 border-2 border-dashed bg-dark-tertiary"
    >
      <svg
        class="w-8 text-yellow-500 stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h1 class="text-xl text-dark-secondary">
        এখনো আপনি কোন ডায়েরি বুকমার্ক করেন নি।
      </h1>
    </div>
    <div v-observe-visibility="visibilityChanged" />
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      articles: [],
      pageMeta: { current_page: 1, last_page: 1 },
    }
  },
  async fetch() {
    const {
      data,
      meta: { current_page, last_page },
    } = await this.$axios.$get(
      `/api/user/bookmarks?page=${this.pageMeta.current_page}`
    )
    this.articles.push(...data)
    this.pageMeta = { current_page, last_page }
  },
  methods: {
    async visibilityChanged(isVisible) {
      if (isVisible) {
        if (this.pageMeta.current_page >= this.pageMeta.last_page) {
          return
        }
        this.pageMeta.current_page++

        await this.$fetch()
      }
    },
  },
}
</script>
