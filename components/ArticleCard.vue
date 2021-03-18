<template>
  <div class="pb-12">
    <div v-if="article.thumbnail">
      <nuxt-link :to="articleUrl">
        <img class="w-full" :src="article.thumbnail" alt="" />
      </nuxt-link>
    </div>

    <!-- User info and reaction start -->
    <div class="flex items-center justify-between mt-5">
      <!-- User info start -->
      <div class="flex items-center mb-1">
        <div class="w-8 h-8 overflow-hidden rounded-full">
          <nuxt-link :to="userProfileUrl">
            <img
              class="w-full"
              :src="article.user.profilePhoto"
              :alt="article.user.name"
            />
          </nuxt-link>
        </div>

        <div class="flex flex-col ml-2">
          <nuxt-link
            class="mb-0 font-semibold dark:text-gray-100"
            :to="userProfileUrl"
          >
            {{ article.user.name }}
          </nuxt-link>
        </div>
      </div>
      <!-- User info end -->

      <!-- Reaction start-->
      <div class="flex items-center">
        <div class="flex items-center mr-1">
          <button
            title="love-react"
            @click="doReact('HEART', article.slug)"
            class="focus:outline-none"
          >
            <svg
              class="w-6 h-6 opacity-75 stroke-current stroke-2"
              :class="{
                'text-red-600': reactedByMe('HEART'),
                'fill-current': reactedByMe('HEART'),
              }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <p class="text-gray-600 dark:text-gray-200">
            {{ reactionCount('HEART') }}
          </p>
        </div>

        <div class="flex items-center mr-1">
          <button
            title="bookmark"
            @click="doReact('BOOKMARK', article.slug)"
            class="focus:outline-none"
          >
            <svg
              class="w-6 h-6 stroke-current stroke-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              :class="{
                'text-green-600': reactedByMe('BOOKMARK'),
                'fill-current': reactedByMe('BOOKMARK'),
              }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>
      </div>
      <!-- Reaction end-->
    </div>
    <!-- User info and reaction end -->

    <nuxt-link
      :to="articleUrl"
      class="inline-block text-xl text-gray-700 dark:text-gray-100"
    >
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

    <p class="text-base text-gray-600 dark:text-gray-200">
      শনিবার, ১৯ ডিসেম্বর ২০২০, দুপুর ৪:২৮ সময়
    </p>
  </div>
</template>
<script>
import reactions from '~/mixins/reactions'
export default {
  props: ['article', 'isSearchCard'],
  mixins: [reactions],
  data() {
    return {
      reactions: this.article.reactions,
    }
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
