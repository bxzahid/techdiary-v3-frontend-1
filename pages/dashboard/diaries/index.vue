<template>
  <div v-if="$fetchState.pending">
    <div class="flex items-center justify-center min-h-[60vh]">
      <loader-spin />
    </div>
  </div>

  <div v-else class="min-h-full">
    <div class="inline-block min-w-full overflow-hidden rounded-lg">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              scope="col"
              class="px-5 py-3 text-sm font-bold text-left uppercase border-b border-gray-200 dark:border-gray-700 text-dark"
            >
              শিরোনাম
            </th>
            <th
              scope="col"
              class="px-5 py-3 text-sm font-bold text-left uppercase border-b border-gray-200 dark:border-gray-700 text-dark"
            >
              তৈরি করা হয়েছিল
            </th>
            <th
              scope="col"
              class="px-5 py-3 text-sm font-bold text-left uppercase border-b border-gray-200 dark:border-gray-700 text-dark"
            >
              status
            </th>
            <th
              scope="col"
              class="px-5 py-3 text-sm font-normal text-left uppercase border-b border-gray-200 dark:border-gray-700 text-dark"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in articles" :key="article.id">
            <td
              class="px-5 py-5 text-sm border-b border-gray-200 dark:border-gray-700"
            >
              <p class="whitespace-no-wrap text-dark">
                <nuxt-link
                  :to="{
                    name: 'username-articleSlug',
                    params: {
                      username: article.user.username,
                      articleSlug: article.slug,
                    },
                  }"
                >
                  {{ article.title }}
                </nuxt-link>
              </p>
            </td>
            <td
              class="px-5 py-5 text-sm border-b border-gray-200 dark:border-gray-700"
            >
              <p class="whitespace-no-wrap text-dark">
                {{ $moment(article.created_at).format('LLLL') }}
              </p>
            </td>
            <td
              class="px-5 py-5 text-sm border-b border-gray-200 dark:border-gray-700"
            >
              <span
                class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900"
              >
                <span
                  aria-hidden="true"
                  class="absolute inset-0 rounded-full opacity-50"
                  :class="{
                    'bg-paste-500': article.is_published,
                    'bg-yellow-400': !article.is_published,
                  }"
                >
                </span>
                <span class="relative" v-if="article.is_published">
                  প্রকাশিত
                </span>

                <span class="relative" v-if="!article.is_published">
                  খসড়া
                </span>
              </span>
            </td>
            <td
              class="px-5 py-5 space-x-2 text-sm border-b border-gray-200 dark:border-gray-700"
            >
              <nuxt-link
                class="font-bold text-indigo-600 hover:text-indigo-900"
                :to="{
                  name: 'dashboard-diaries-slug-edit',
                  params: { slug: article.slug },
                }"
              >
                সংস্কার
              </nuxt-link>

              <a
                href="#"
                class="mr-2 text-sm font-bold text-red-400 hover:underline"
                @click="removeArticle(article.slug, index)"
              >
                মুছুন
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!articles.length"
      class="flex items-center justify-center h-full text-center"
    >
      <div>
        <div class="max-w-md mx-auto">
          <icons-no-diaries class="mx-auto my-3" />
        </div>
        <h2 class="mb-4 text-2xl text-dark">এখনো কোন ডায়েরি লিখেননি? 😭</h2>
        <nuxt-link
          :to="{ name: 'dashboard-diaries-new' }"
          class="inline-flex items-center justify-center px-2 px-5 py-3 mb-6 transition duration-200 shadow hover:shadow-lg bg-primary rounded-3xl"
        >
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span class="inline-block ml-2">নতুন ডায়েরি</span>
        </nuxt-link>
      </div>
    </div>

    <div v-observe-visibility="visibilityChanged" />
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  head() {
    return {
      title: 'সকল ডায়েরি সমূহ',
    }
  },
  layout: 'dashboard',
  data: () => ({
    articles: [],
    modalOpen: false,
    pageMeta: {
      current_page: 1,
      last_page: null,
    },
    removeArticleSlug: null,
    removeArticleIndex: null,
  }),
  async fetch() {
    const {
      data,
      meta: { current_page, last_page },
    } = await this.$axios.$get(
      `/api/my-articles?page=${this.pageMeta.current_page}`
    )
    this.articles.push(...data)
    this.pageMeta = { current_page, last_page }
  },
  methods: {
    async removeArticle(slug, index) {
      swal({
        title: 'ডায়েরি মুছে ফেলতে চান?',
        text: 'সাবধান - একবার মুছে ফেলার পর আর  কখনোই ফিরিয়ে আনা যাবে না',
        icon: 'warning',
        buttons: ['না', 'হ্যাঁ'],
        dangerMode: true,
      }).then(async (confirmed) => {
        if (confirmed) {
          await this.$axios.$delete(`/api/articles/${slug}`)
          this.articles.splice(index, 1)
          this.$toast.success('ডায়েরি মুছে ফেলা হয়েছে।')
        }
      })
    },
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
