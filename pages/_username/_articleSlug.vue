<template>
  <div v-if="$fetchState.pending">
    <div class="flex items-center justify-center min-h-[60vh]">
      <loader-spin />
    </div>
  </div>
  <div v-else>
    <div class="fixed hidden w-32 md:block top-25">
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
        <h2 class="text-3xl dark:text-gray-300">
          {{ article.title }}
        </h2>
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

      <article-user-info :article="article" />
      <div class="content-typography text-dark" v-html="article.body"></div>
      <article-comments />
    </div>
  </div>
</template>
<script>
import editorjsParser from '~/mixins/editorjsParser'
import reactions from '~/mixins/reactions'
export default {
  name: 'techdiary-details',
  mixins: [reactions],
  head() {
    return {
      title: this.article?.title,
      meta: [
        {
          name: 'description',
          content: `${this.article?.title} | Techdiary`,
        },
        {
          property: 'og:title',
          content: `${this.article?.title} | Techdiary`,
        },
        {
          property: 'og:image',
          content: this.article?.thumbnail,
        },
        {
          property: 'og:image:width',
          content: '1200',
        },

        {
          property: 'og:image:height',
          content: '630',
        },
        {
          property: 'twitter:site',
          content: '630',
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          property: 'twitter:image',
          content: this.article?.thumbnail,
        },
        {
          property: 'keywords',
          content: `${this.article?.tags.map((k) => k.name).join(',')}`,
        },
      ],
    }
  },
  data() {
    return {
      article: null,
      comments: [],
    }
  },
  async fetch() {
    const { data: article } = await this.$axios.get(
      `api/articles/${this.$route.params.articleSlug}`
    )
    article.data.body = editorjsParser(article.data.body)
    this.article = article.data
    this.reactions = article.data.reactions
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
}
</script>
