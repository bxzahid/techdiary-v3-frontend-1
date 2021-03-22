<template>
  <div v-if='$fetchState.pending'>
    <div class='sk-chase'>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
      <div class='sk-chase-dot'></div>
    </div>
  </div>
  <div v-else>
    <div
      class='flex mb-2 py-2 transition-all duration-500 ease-in-out rounded dark:hover:bg-gray-600 hover:bg-gray-100'
      v-for='(article, index) in articles'
      :key='article.id'
    >
      <div class='ml-3'>
        <h3 class='text-lg text-gray-700 dark:text-gray-100'>
          <nuxt-link
            :to="{
              name: 'username-articleSlug',
              params: {
                username: article.user.username,
                articleSlug: article.slug,
              },
            }"
          >{{ article.title }}
          </nuxt-link
          >
        </h3>
        <p class='text-sm font-bold text-gray-600 dark:text-gray-200'>
          {{ $moment(article.created_at).format('LLLL') }}
        </p>

      </div>
    </div>
    <div v-observe-visibility='visibilityChanged' />
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      articles: [],
      pageMeta: { current_page: 1, last_page: 1 }
    }
  },
  async fetch() {
    const {
      data,
      meta: { current_page, last_page }
    } = await this.$axios.$get(`/api/user/bookmarks?page=${this.pageMeta.current_page}`)
    this.articles.push(...data)
    this.pageMeta = { current_page, last_page }
  },
  methods: {
    async visibilityChanged(isVisible) {
      if (isVisible) {
        if (this.pageMeta.current_page >= this.pageMeta.last_page) {
          return
        }
        this.pageMeta.current_page++

        await this.$fetch()
      }

    }
  }
}
</script>

<style>
.sk-chase {
  width: 40px;
  height: 40px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2.0s infinite ease-in-out both;
}

.sk-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: #fff;
  border-radius: 100%;
  animation: sk-chase-dot-before 2.0s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
  animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2) {
  animation-delay: -1.0s;
}

.sk-chase-dot:nth-child(3) {
  animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4) {
  animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5) {
  animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6) {
  animation-delay: -0.6s;
}

.sk-chase-dot:nth-child(1):before {
  animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2):before {
  animation-delay: -1.0s;
}

.sk-chase-dot:nth-child(3):before {
  animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4):before {
  animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5):before {
  animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes sk-chase {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot {
  80%, 100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%, 0% {
    transform: scale(1.0);
  }
}
</style>
