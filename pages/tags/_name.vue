<template>
  <layout-home>
    <template #top>
      <div v-if="!$fetchState.pending">
        <div
          :style="{
            'border-color': tag.color,
          }"
          class="bg-secondary shadow-sm border-t-8 dark:bg-gray-800 max-w-[1200px] w-[95%] py-6 min-h-[150px] mt-16 mx-auto px-5 rounded-md flex md:flex-row items-center flex-col md:space-x-5 space-y-4"
        >
          <img class="w-20" :src="tag.icon" :alt="tag.name" />

          <div>
            <h1 class="mb-2 text-2xl uppercase text-dark" style="opacity: 1">
              {{ tag.name }}
            </h1>
            <p class="text-dark">
              {{ tag.description }}
            </p>
          </div>
        </div>
      </div>
    </template>

    <div v-if="$fetchState.pending">
      <div class="flex items-center justify-center min-h-[60vh]">
        <loader-spin />
      </div>
      <!--  -->
    </div>
    <div v-else>
      <ArticleCard
        v-for="article in articles"
        class="mb-5"
        :key="article.id"
        :article="article"
      />
      <div v-observe-visibility="visibilityChanged"></div>
    </div>
  </layout-home>
</template>

<script>
export default {
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
    tag: {},
    articles: [],
    initialLoading: true,
    pageMeta: {
      current_page: 1,
      last_page: null,
    },
  }),
  async fetch() {
    try {
      const {
        data,
        meta: { current_page, last_page },
      } = await this.$axios.$get(`/api/articles?tag=${this.$route.params.name}`)

      const { data: tag } = await this.$axios.$get(
        `/api/tags/${this.$route.params.name}`
      )

      this.tag = tag
      this.articles = data
      this.pageMeta = { current_page, last_page }
    } catch (error) {}
  },
  methods: {
    async loadMore() {
      const { data: articles } = await this.$axios.$get(
        `/api/articles?tag=${this.$route.params.name}&page=${this.pageMeta.current_page}`
      )
      this.articles.push(...articles)
    },
    async visibilityChanged(isVisible) {
      if (!isVisible) return
      if (this.pageMeta.currentPage >= this.pageMeta.lastPage) return
      this.pageMeta.current_page++
      await this.loadMore()
    },
  },
}
</script>
