<template>
  <div class='flex items-center justify-center h-full' v-if='$fetchState.pending'>
    <div class='sk-chase'>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
    </div>
  </div>
  <div v-else>
    <div
      class='flex mb-2 py-2 transition-all duration-500 ease-in-out rounded dark:hover:bg-gray-600 hover:bg-gray-100'
      v-for='(article, index) in articles'
      :key='article.id'
    >
      <div class='ml-3'>
        <h3 class='text-lg text-gray-700 dark:text-gray-100'>
          <nuxt-link
            :to="{
                name: 'username-articleSlug',
                params: {
                  username: article.user.username,
                  articleSlug: article.slug,
                },
              }"
          >{{ article.title }}
          </nuxt-link
          >
        </h3>
        <p class='text-sm font-bold text-gray-600 dark:text-gray-200'>
          {{ $moment(article.created_at).format('LLLL') }}
        </p>

      </div>
    </div>
    <div v-observe-visibility='visibilityChanged' />
  </div>

</template>
<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      articles: [],
      pageMeta: { current_page: 1, last_page: 1 }
    }
  },
  async fetch() {
    const {
      data,
      meta: { current_page, last_page }
    } = await this.$axios.$get(`/api/user/bookmarks?page=${this.pageMeta.current_page}`)
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

    }
  }
}
</script>

