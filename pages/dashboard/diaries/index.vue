<template>
  <div>
    <div
      class="flex mb-4 transition-all duration-500 ease-in-out rounded dark:hover:bg-gray-600 hover:bg-gray-100"
      v-for="(article, index) in articles"
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
            @click="removeArticle(article.slug, index)"
            >মুছুন</a
          >
          <a href="#" class="text-sm font-bold text-indigo-400"> খসড়া করুন </a>
        </div>
      </div>
    </div>
    <div v-observe-visibility="visibilityChanged" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head() {
    return {
      title: 'Update diaries',
    }
  },
  layout: 'dashboard',
  data: () => ({
    articles: [],
    pageMeta: {
      current_page: 1,
      last_page: null,
    },
  }),
  async asyncData({ $axios }) {
    const {
      data,
      meta: { current_page, last_page },
    } = await $axios.$get('/api/my-articles')
    return { articles: data, pageMeta: { current_page, last_page } }
  },

  methods: {
    async removeArticle(slug: string, index: number) {
      if (!confirm('Sure to delete?')) return

      await this.$axios.$delete(`/api/articles/${slug}`)
      this.articles.splice(index, 1)
    },

    async loadMore() {
      const { data } = await this.$axios.$get(
        `/api/my-articles?page=${this.pageMeta.current_page}`
      )

      // @ts-ignore
      this.articles.push(...data)
    },
    async visibilityChanged(isVisible: boolean) {
      if (!isVisible) {
        return
      }
      // @ts-ignore
      if (this.pageMeta.currentPage >= this.pageMeta.lastPage) {
        return
      }
      this.pageMeta.current_page++

      await this.loadMore()
    },
  },
})
</script>
