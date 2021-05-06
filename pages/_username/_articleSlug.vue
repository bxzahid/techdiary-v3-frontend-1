<template>
  <div>
    <progress max='100' value='0' class='hidden' ref='article_progress'></progress>
    <div v-if="$fetchState.pending" class="wrapper">
      <skelleton-article-details />
    </div>

    <div v-if="!$fetchState.pending && article" class="wrapper">
      <alert v-if="!article.isPublished" class="mb-8">
        অপ্রকাশিত ডায়েরি, তবে আপনি চাইলে URL এর মাধ্যমে যে কাউকে দেখাতে পারবেন।
        <template v-slot:sub-title>
          অপ্রকাশিত ডায়েরি প্রথম পাতায় দেখানো হবে না।
        </template>
      </alert>

      <div class="fixed hidden w-32 md:block top-25">
        <ArticleReactions :article='article' :progress='articleProgress' />
      </div>
      <div class="mx-auto md:w-8/12">
        <div v-if="article.thumbnail" class="overflow-hidden rounded-md">
          <img :src="article.thumbnail" :alt="article.title" />
        </div>

        <!-- Title and meta start -->
        <div class='my-4'>
          <h2 class='text-3xl md:text-4xl dark:text-gray-300 font-Boshonto'>
            {{ article.title }}
          </h2>
          <p class='text-dark-secondary'>
            {{ $moment(article.created_at).format('LLLL') }}
          </p>
          <!-- tags -->
          <div class='flex flex-wrap text-dark-secondary'>
            <nuxt-link class='mr-2'
                       :to="{ name: 'tags-name', params: { name: tag.name } }"
                       v-for='tag in article.tags'
                       :key='tag.id'
            >
              #{{ tag.name }}
            </nuxt-link>
          </div>
        </div>

        <!-- Title and meta end -->
        <article-user-info :article='article' />

        <div class='mt-3'>
          <a href='https://contest.techdiary.dev' target='_blank'>
            <img
              class='w-full rounded-md'
              src='https://res.cloudinary.com/techdiary-dev/image/upload/v1619780480/static-assets/contest/k09ialie9h1cr5tir9wi.png'
              alt='dev-article-contest-season-1'
            />
          </a>
        </div>

        <article ref='content'
                 class='my-6 content-typography text-dark max-w-none'
                 :id='article.id'
                 v-html='article.body'
        />

        <article-comments />
      </div>
    </div>
  </div>
</template>
<script>
import gsap from 'gsap'
// import scrollTrigger from 'gsap/scrollTrigger'
import editorjsParser from '~/mixins/editorjsParser'
import reactions from '~/mixins/reactions'

export default {
  name: 'techdiary-details',
  mixins: [reactions],
  updated() {
    if (this.updatedCount <= 0) {
      this.progressGsap = this.$gsap.to(this, {
        articleProgress: 100,
        duration: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.content-typography',
          start: 'top 20%',
          end: 'bottom 80%',
          scrub: 0.3,
        }
      })
      this.updatedCount++
    }
    console.log('updated article details')
  },

  head() {
    return {
      title: this.article?.title,
      meta: [
        {
          name: 'description',
          content: `${this.article?.title} | Techdiary`
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
          content: this.article?.thumbnail
        },
        {
          property: 'keywords',
          content: `${this.article?.tags.map((k) => k.name).join(',')}`
        }
      ],
    }
  },
  beforeDestroy() {
    this.progressGsap.kill()
  },
  data() {
    return {
      article: null,
      comments: [],
      articleProgress: 0,
      progressGsap: null,
      updatedCount: 0
    }
  },
  async fetch() {
    try {
      const { data: article } = await this.$axios.get(
        `api/articles/${this.$route.params.articleSlug}`
      )
      article.data.body = editorjsParser(article.data.body)
      this.article = article.data
      this.reactions = article.data.reactions
    } catch (error) {
      this.$nuxt.error({ statusCode: 400, message: 'ডায়েরি খুঁজে পাওয়া যায়নি' })
    }
  },
  computed: {
    userProfileUrl() {
      return {
        name: 'username',
        params: {
          username: this.article.user.username
        }
      }
    }
  },
  methods: {
    onScrollContent(e) {
      console.log('scrolled')
    }
  }
}
</script>

<style>

</style>
