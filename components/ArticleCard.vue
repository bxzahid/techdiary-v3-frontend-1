<template>
  <div class="pb-5">
    <article-user-info :article="article" :showReactionAlways="true" />

    <div v-if="article.thumbnail">
      <nuxt-link :to="articleUrl">
        <img class="w-full rounded-md" :src="article.thumbnail" alt="" />
      </nuxt-link>
    </div>

    <!-- Article content start -->
    <div class="mt-2">
      <nuxt-link :to="articleUrl" class="block text-xl text-dark">
        <span
          v-if="isSearchCard"
          class="search-title"
          v-html="article._highlightResult.title.value"
        >
        </span>
        <span v-else>
          {{ article.title }}
        </span>
      </nuxt-link>

      <p class="mt-2 text-dark-secondary">
        {{ $moment(article.created_at).format('LLLL') }}
      </p>

      <div class="flex flex-wrap space-x-2 text-dark-secondary">
        <nuxt-link
          :to="{ name: 'tags-name', params: { name: tag.name } }"
          v-for="tag in article.tags"
          :key="tag.id"
        >
          #{{ tag.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import reactions from '~/mixins/reactions'
export default {
  props: ['article', 'isSearchCard'],
  mixins: [reactions],
  computed: {
    articleUrl() {
      return {
        name: 'username-articleSlug',
        params: {
          username: this.article.user.username,
          articleSlug: this.article.slug,
        },
      }
    },
  },
}
</script>
<style>
.search-title em {
  @apply font-normal bg-yellow-200 text-gray-700;
  font-style: normal;
}
</style>
