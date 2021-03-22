<template>
  <Fragment>
    <div class="fixed w-32 top-25">
      <ArticleReactions :article="article" />
    </div>
    <div class="mx-auto md:w-8/12">
      <alert v-if="!article.isPublished" class="mb-4">
        অপ্রকাশিত ডায়েরি, তবে আপনি চাইলে URL এর মাধ্যমে যে কাউকে দেখাতে পারবেন।
        <template v-slot:sub-title>
          অপ্রকাশিত ডায়েরি প্রথম পাতায় দেখানো হবে না।
        </template>
      </alert>

      <div v-if="article.thumbnail" class="overflow-hidden rounded-md">
        <img :src="article.thumbnail" :alt="article.title" />
      </div>

      <div class="my-4">
        <h2 class="text-3xl dark:text-gray-300">{{ article.title }}</h2>
        <p class="text-dark-secondary">
          {{ $moment(article.created_at).format('LLLL') }}
        </p>
        <!-- tags -->
        <div class="flex space-x-2 text-dark-secondary">
          <a href="#" v-for="tag in article.tags" :key="tag.id">
            #{{ tag.name }}
          </a>
        </div>
      </div>

      <nuxt-link
        :to="userProfileUrl"
        class="flex items-center mb-4 space-x-2 font-mono"
      >
        <img
          class="w-8 rounded-full"
          :src="article.user.profilePhoto"
          :alt="article.user.name"
        />

        <span class="font-mono text-dark-secondary">
          {{ article.user.username }}
        </span>
      </nuxt-link>

      <div class="markdown text-dark" v-html="article.body"></div>
      <!-- <article-comments /> -->
    </div>
  </Fragment>
</template>
<script>
import editorjsParser from '~/mixins/editorjsParser'
import reactions from '~/mixins/reactions'
/**
 *
 */
export default {
  name: 'techdiary-details',
  mixins: [reactions],
  head() {
    return {
      title: this.article.title,
    }
  },
  data() {
    return {
      article: null,
      comments: [],
    }
  },

  async asyncData({ $axios, params }) {
    const { data: article } = await $axios.get(
      `api/articles/${params.articleSlug}`
    )
    article.data.body = editorjsParser(article.data.body)
    return { article: article.data, reactions: article.data.reactions }
  },
  computed: {
    userProfileUrl() {
      return {
        name: 'username',
        params: {
          username: this.article.user.username,
        },
      }
    },
  },

  // async fetch() {
  //   const { data: article } = await this.$axios.get(
  //     `api/articles/${this.$route.params.articleSlug}`
  //   )
  //   article.data.body = editorjsParser(article.data.body)
  //   this.article = article.data
  //   this.reactions = article.data.reactions
  // },
}
</script>
