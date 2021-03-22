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
    <client-only>
      <modal @confirm='confirmation' :modalOpen='modalOpen' v-show='modalOpen'>
        <template v-slot:header>
          Delete Articles
        </template>
        Are you sure you want to do this? this Article will be removed and cannot be undone.
      </modal>
    </client-only>
    <div
      class='flex mb-4 transition-all duration-500 ease-in-out rounded dark:hover:bg-gray-600 hover:bg-gray-100'
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
        <p class="text-sm font-bold text-gray-600 dark:text-gray-200">
          {{ $moment(article.created_at).format('LLLL') }}
        </p>

        <div class="mt-1">
          <nuxt-link
            :to="{
              name: 'dashboard-diaries-slug-edit',
              params: { slug: article.slug },
            }"
            class="mr-2 text-sm font-bold text-green-400"
          >
            সংস্কার
          </nuxt-link>
          <a
            href="#"
            class="mr-2 text-sm font-bold text-red-400"
            @click='removeArticle(article.slug, index)'
          >মুছুন</a
          >
          <a href='#' class='text-sm font-bold text-indigo-400'> খসড়া করুন </a>
        </div>
      </div>
    </div>
    <div v-observe-visibility='visibilityChanged' />
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Update diaries'
    }
  },
  layout: 'dashboard',
  data: () => ({
    articles: [],
    modalOpen: false,
    pageMeta: {
      current_page: 1,
      last_page: null
    },
    removeArticleSlug: null,
    removeArticleIndex: null
  }),
  async fetch() {
    const {
      data,
      meta: { current_page, last_page }
    } = await this.$axios.$get(`/api/my-articles?page=${this.pageMeta.current_page}`)
    this.articles.push(...data)
    this.pageMeta = { current_page, last_page }
  },
  methods: {
    confirmation(value) {
      if (value) this.removeArticle(this.removeArticleSlug, this.removeArticleIndex, value)
      this.modalOpen = false
    },
    async removeArticle(slug, index, confirm) {
      if (!confirm) {
        this.removeArticleSlug = slug
        this.removeArticleIndex = index
        this.modalOpen = true
        return
      }
      await this.$axios.$delete(`/api/articles/${slug}`)
      this.articles.splice(index, 1)
      this.$toast.info('Article deleted.')
    },
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
