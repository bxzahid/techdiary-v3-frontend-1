<template>
  <div>
    <div class='mb-4 pt-20 mx-2 md:pt-0 md:hidden'>
      <mobile-search />
    </div>
    <div v-if='loading' class='my-5 text-center'>
      <SyncLoader color='#58d4e1' />
    </div>

    <ArticleCard
      v-else
      :isSearchCard='true'
      v-for='article in results'
      class='mb-5'
      :key='article.id'
      :article='article'
    />
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: 'Search'
    }
  }
}
</script>
