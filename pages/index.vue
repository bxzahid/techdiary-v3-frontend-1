<template>
  <div>
    <editor-fake-editor />
    <ArticleCard
      v-for="article in articles"
      class="mb-5"
      :key="article.id"
      :article="article"
    />
    <div v-observe-visibility="visibilityChanged"></div>
  </div>
</template>

<script>
export default {
  layout: 'home',
  head: {
    title: 'নীড়',
    meta: [
      {
        name: 'description',
        content: `টেকডায়েরি | বাংলার প্রোগ্রামিং নেটওয়ার্ক`,
      },
      {
        property: 'og:title',
        content: `টেকডায়েরি | বাংলার প্রোগ্রামিং নেটওয়ার্ক`,
      },
      {
        property: 'og:image',
        content:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616454527/static-assets/ysbycrhmbjdxqirpskdl.jpg',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },

      {
        property: 'og:image:height',
        content: '630',
      },
    ],
  },
  data: () => ({
    articles: [],
    pageMeta: {
      current_page: 1,
      last_page: null,
    },
  }),
  async asyncData({ $axios }) {
    try {
      const {
        data,
        meta: { current_page, last_page },
      } = await $axios.$get('/api/articles')

      return {
        articles: data,
        pageMeta: { current_page, last_page },
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async loadMore() {
      const { data, meta } = await this.$axios.$get(
        `/api/articles?page=${this.pageMeta.current_page}`
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
