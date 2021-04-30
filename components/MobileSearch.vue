<template>
  <div class="relative">
    <input
      type="text"
      class="w-full h-full px-3 py-3 bg-gray-300 rounded-lg dark:text-gray-300 dark:bg-gray-600 focus:outline-none"
      placeholder="সার্চ করুন"
      v-model="query"
    />
    <svg
      width="20"
      class="absolute top-0 right-0 mt-3 mr-2 text-gray-700 dark:text-gray-300"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
  data() {
    return {
      query: this.$route.params.query || '',
    }
  },
  watch: {
    query: {
      handler: debounce(function (query) {
        this.$store.dispatch('search/doSearch', {
          index: 'articles',
          query,
          page: 1
        })
        if (query)
          this.$route.params.query = query
      }, 500),
    },
  },
}
</script>
