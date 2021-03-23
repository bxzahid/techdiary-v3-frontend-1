<template>
  <div v-if="$fetchState.pending">
    <div class="flex items-center justify-center min-h-[60vh]">
      <loader-spin />
    </div>
  </div>
  <div v-else>
    <div
      class="flex py-2 mb-2 transition-all duration-500 ease-in-out rounded dark:hover:bg-gray-600 hover:bg-gray-100"
      v-for="(article, index) in articles"
      :key="article.id"
    >
      <div class="ml-3">
        <h3
          class="flex items-center space-x-2 text-lg text-gray-700 dark:text-gray-100"
        >
          <button
            @click="remove(article.id, index)"
            class="text-3xl text-red-600 rounded-full w-9 h-9 hover:bg-red-600 hover:text-white"
          >
            &times;
          </button>

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
      class="flex items-center justify-center h-full text-center"
    >
      <div>
        <div class="max-w-md mx-auto">
          <icons-no-diaries class="mx-auto my-3" />
        </div>
        <h2 class="mb-4 text-2xl text-dark">
          এখনো আপনি কোন ডায়েরি বুকমার্ক করেন নি। 😭
        </h2>
      </div>
    </div>

    <div v-observe-visibility="visibilityChanged" />
  </div>
</template>
<script>
import swal from 'sweetalert'
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      articles: [],
      pageMeta: { current_page: 1, last_page: 1 },
      modalOpen: false,
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
    remove(articleId, index) {
      swal({
        title: 'বুকমার্ক মুছে ফেলতে চান?',
        text:
          'আপনি যদি এই ডায়েরি টি এখনো পড়ে না থাকেন তবে এটি মুছে ফেলা উচিত হবে না',
        icon: 'warning',
        buttons: ['না', 'হ্যাঁ'],
        dangerMode: true,
      }).then(async (confirmed) => {
        if (confirmed) {
          await this.$axios.$delete(`/api/user/bookmarks/${articleId}`)
          this.articles.splice(index, 1)
          this.$toast.success('বুকমার্ক মুছে ফেলা হয়েছে।')
        }
      })
    },
  },
}
</script>
