<template>
  <div>
    <button class='py-20 bg-gray-100 w-full rounded-md my-6 shadow '>
      <span class='flex items-center justify-center'>
        <svg width='15' height='15' class='mr-4' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M14 9.66667C14 10.0498 13.8478 10.4172 13.5769 10.688C13.306 10.9589 12.9386 11.1111 12.5556 11.1111H3.88889L1 14V2.44444C1 2.06135 1.15218 1.69395 1.42307 1.42307C1.69395 1.15218 2.06135 1 2.44444 1H12.5556C12.9386 1 13.306 1.15218 13.5769 1.42307C13.8478 1.69395 14 2.06135 14 2.44444V9.66667Z'
          stroke='#71717A' stroke-linecap='round' stroke-linejoin='round' />
      </svg>
      মন্তব্য যুক্ত করুন
      </span>
    </button>


    <article-comment v-for='comment in comments' :comment='comment' :key='comment.id' :level='0' />

  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      currentPage: 1
    }
  },
  async fetch() {
    const comments = await this.$axios.get(`/api/articles/${this.$route.params.articleSlug}/comments?page=${this.currentPage}`)

    this.comments = this.comments.concat(comments.data.data)
  }

}
</script>
