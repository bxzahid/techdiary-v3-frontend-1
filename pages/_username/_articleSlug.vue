<template>
  <Fragment>
    <div class="fixed w-32 top-25">
      <ArticleReactions :article="article" />
    </div>

    <div class="mx-auto md:w-8/12">
      <div v-if="article.thumbnail" class="mb-8 overflow-hidden rounded-md">
        <img :src="article.thumbnail" :alt="article.title" />
      </div>

      <h2 class="mb-5 text-3xl dark:text-gray-300">{{ article.title }}</h2>

      <!-- user info start -->
      <div class="flex items-center justify-between py-3 mb-3">
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 overflow-hidden rounded-full">
            <img :src="article.user.profilePhoto" :alt="article.user.name" />
          </div>
          <h3 class="text-base font-bold">{{ article.user.name }}</h3>
        </div>
      </div>
      <!-- user info end -->

      <div class="markdown" v-html="article.body"></div>
      <article-comments />
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
      bodyAttrs: {
        class: 'bg-white dark:bg-gray-900',
      },
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
