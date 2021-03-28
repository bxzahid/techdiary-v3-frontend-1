<template>
  <div v-if="$fetchState.pending">
    <div class="flex items-center justify-center min-h-[60vh]">
      <loader-spin />
    </div>
  </div>

  <div v-else class="min-h-full">
    <div class="flex items-center justify-between mb-10">
      <h3 class="text-xl text-gray-500 dark:text-gray-300">সিরিজসিরিজ</h3>
      <form-button @click="newSeries">
        <svg
          class="w-5 h-5"
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
        <span>নতুন সিরিজ</span>
      </form-button>
    </div>

    <div
      class="flex mb-4 transition-all duration-500 ease-in-out rounded dark:hover:bg-gray-600 hover:bg-gray-100"
      v-for="(s, index) in series"
      :key="s.id"
    >
      <div
        class="flex items-center space-x-2 text-lg text-gray-700 dark:text-gray-100"
      >
        <button
          @click="remove(s.id, index)"
          class="text-3xl text-red-600 rounded-full w-9 h-9 hover:bg-red-600 hover:text-white"
        >
          &times;
        </button>

        <nuxt-link
          :to="{ name: 'dashboard-series-id', params: { id: s.id } }"
          class="flex items-center justify-center text-3xl text-red-600 rounded-full w-9 h-9 hover:bg-red-600 hover:text-white"
        >
          <svg
            class="w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
        </nuxt-link>

        <span>
          {{ s.name }}
        </span>
      </div>
    </div>

    <div
      v-if="!series.length"
      class="flex items-center justify-center h-full text-center"
    >
      <div>
        <div class="max-w-md mx-auto">
          <icons-no-diaries class="mx-auto my-3" />
        </div>
        <h2 class="mb-4 text-2xl text-dark">এখনো কোন ডায়েরি লিখেননি? 😭</h2>
        <nuxt-link
          :to="{ name: 'dashboard-diaries-new' }"
          class="inline-flex items-center justify-center px-2 py-3 mb-6 transition duration-200 shadow hover:shadow-lg bg-primary rounded-3xl"
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
import swal from 'sweetalert'
export default {
  layout: 'dashboard',
  data() {
    return {
      series: [],
      pageMeta: {
        current_page: 1,
        last_page: null,
      },
    }
  },
  async fetch() {
    const {
      data,
      meta: { current_page, last_page },
    } = await this.$axios.$get(
      `/api/series/my-series?page=${this.pageMeta.current_page}`
    )
    this.series.push(...data)
    this.pageMeta = { current_page, last_page }
  },
  methods: {
    newSeries() {
      swal({
        text: 'নতুন সিরিজ এর নাম?',
        content: 'input',
        button: {
          text: 'সেভ করুন',
          closeModal: true,
        },
      }).then(async (name) => {
        const series = await this.$axios.$post(`/api/series`, { name })
        this.series.unshift(series)
      })
    },
    async remove(id, index) {
      swal({
        title: 'সিরিজ মুছে ফেলতে চান?',
        text: 'সাবধান - একবার মুছে ফেলার পর আর কখনোই ফিরিয়ে আনা যাবে না',
        icon: 'warning',
        buttons: ['না', 'হ্যাঁ'],
        dangerMode: true,
      }).then(async (confirmed) => {
        if (confirmed) {
          await this.$axios.$delete(`/api/series/${id}`)
          this.series.splice(index, 1)
          this.$toast.success('মুছে ফেলা হয়েছে।')
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
