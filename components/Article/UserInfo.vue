<template>
  <!-- user info and actions start -->
  <div class="flex items-center justify-between h-12">
    <nuxt-link
      :to="userProfileUrl"
      class="flex items-center space-x-2 font-mono"
    >
      <div class="w-8 overflow-hidden rounded-full">
        <image-widget
          crop="scale"
          width="32"
          fetchFormat="auto"
          quality="auto"
          loading="lazy"
          :imageUrl="article.user.profilePhoto"
          :alt="article.user.name"
        />
      </div>
      <span class="font-mono text-dark-secondary">
        {{ article.user.username }}
      </span>
    </nuxt-link>

    <!-- Reaction start-->
    <div
      class="flex items-center space-x-3"
      :class="{
        'md:hidden': showReactionAlways === false,
      }"
    >
      <nuxt-link
        v-if="$auth.loggedIn && $auth.user.id == article.user.id"
        :to="{
          name: 'dashboard-diaries-slug-edit',
          params: { slug: article.slug },
        }"
      >
        <svg
          class="w-5 text-dark-secondary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </nuxt-link>

      <div class="flex items-center mr-1 space-x-1">
        <button
          title="love-react"
          @click="doReact('HEART', article.slug)"
          class="focus:outline-none"
        >
          <svg
            class="w-5 stroke-1"
            :class="{
              'text-dark-secondary': !reactedByMe('HEART'),
              'text-red-600': reactedByMe('HEART'),
              'fill-current': reactedByMe('HEART'),
            }"
            viewBox="0 0 19 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="stroke-current"
              d="M1.79691 3.77795C2.00422 3.23198 2.30807 2.7359 2.69111 2.31804C3.07415 1.90017 3.52889 1.5687 4.02936 1.34255C4.52984 1.1164 5.06624 1 5.60795 1C6.14965 1 6.68605 1.1164 7.18653 1.34255C7.687 1.5687 8.14174 1.90017 8.52478 2.31804L9.73295 3.63604L10.9411 2.31804C11.7147 1.47412 12.7639 1.00001 13.8579 1.00001C14.952 1.00001 16.0012 1.47412 16.7748 2.31804C17.5484 3.16196 17.983 4.30656 17.983 5.50004C17.983 6.69352 17.5484 7.83812 16.7748 8.68204L9.73295 16.364L2.69111 8.68204C2.30807 8.26417 2.00422 7.7681 1.79691 7.22213C1.58961 6.67616 1.48291 6.09099 1.48291 5.50004C1.48291 4.90909 1.58961 4.32392 1.79691 3.77795Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <p class="text-base text-dark">
          {{ reactionCount('HEART') }}
        </p>
      </div>

      <button
        title="bookmark"
        @click="doReact('BOOKMARK', article.slug)"
        class="focus:outline-none"
      >
        <svg
          class="w-4"
          :class="{
            'text-dark-secondary': !reactedByMe('BOOKMARK'),
            'text-green-600': reactedByMe('BOOKMARK'),
            'fill-current': reactedByMe('BOOKMARK'),
          }"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="stroke-current"
            d="M1.83354 1.28697C1.52462 1.63079 1.35107 2.0971 1.35107 2.58333V17.25L7.11647 14.0417L12.8819 17.25V2.58333C12.8819 2.0971 12.7083 1.63079 12.3994 1.28697C12.0905 0.943154 11.6715 0.75 11.2346 0.75H2.99833C2.56145 0.75 2.14246 0.943154 1.83354 1.28697Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <!-- Reaction end-->
  </div>
  <!-- user info and actions end -->
</template>

<script>
import reactions from '~/mixins/reactions'
export default {
  mixins: [reactions],
  props: {
    article: {
      type: Object,
    },
    showReactionAlways: {
      type: Boolean,
      default: false,
    },
  },
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
  },
}
</script>
