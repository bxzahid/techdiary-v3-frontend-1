<template>
  <div>
    <div class="mb-4 md:hidden">
      <mobile-search />
    </div>

    <div v-if="loading" class="my-5 text-center">
      <SyncLoader color="#58d4e1" />
    </div>

    <ArticleCard
      v-else
      :isSearchCard="true"
      v-for="article in results"
      class="mb-5"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SyncLoader from 'vue-spinner/src/SyncLoader'
export default {
  components: {
    SyncLoader,
  },
  mounted() {
    if (this.$route.params.query) {
      this.$store.dispatch('search/doSearch', {
        index: 'articles',
        query: this.$route.params.query,
      })
    }
  },
  layout: 'home',
  name: 'search-page',
  computed: mapState('search', ['results', 'meta', 'loading']),
  //   methods: {
  //     async visibilityChanged(isVisible) {
  //       if (!isVisible) {
  //         return
  //       }
  //       if (this.meta.page >= this.meta.nbPages) {
  //         return
  //       }
  //       await this.$store.dispatch('search/doSearch', {
  //         index: 'articles',
  //         query: this.$route.params.query,
  //         page: ++this.meta.page,
  //       })
  //     },
  //   },
}
</script>
