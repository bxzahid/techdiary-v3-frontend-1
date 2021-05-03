<template>
  <aside class='col-span-12 mb-5 md:mb-0 md:col-span-3' v-if='user'>
    <div class='rounded w-72 md:w-full' v-if='user.profilePhoto'>
      <nuxt-img
        class='object-cover rounded h-auto w-full'
        :src='user.profilePhoto'
        :alt='user.username'
      />
    </div>

    <div class='mt-5'>
      <h2 class='flex items-center text-2xl dark:text-gray-200'>
        <span
          class='inline-block w-2 h-2 mr-2 rounded-full'
          :class="{
            'bg-green-500': isOnline(user.username),
            'bg-red-500': !isOnline(user.username),
          }"
        ></span>

        {{ user.name }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400">@{{ user.username }}</p>

      <div v-if="user.designation" class="mt-3 italic dark:text-gray-200">
        {{ user.designation }}
      </div>
      <p class="mt-2 dark:text-gray-500">
        {{ user.bio }}
      </p>
    </div>

    <!-- Profile Infos -->
    <div class="mt-4">
      <!-- user.social_links && -->

      <!-- Info: Github -->
      <div
        class="flex items-center mb-2"
        v-if="user.social_links && user.social_links.github"
      >
        <svg
          class="w-5 h-5 mr-2 text-gray-800 dark:text-gray-400"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          ></path>
        </svg>
        <a
          target='_blank'
          :href='user.social_links.github'
          class='text-gray-800 dark:text-gray-400'
        >{{ fetchUsernameFromUrl(user.social_links.github) }}</a
        >
      </div>

      <!-- Info: Twitter -->
      <div
        class="flex items-center mb-2"
        v-if="user.social_links && user.social_links.twitter"
      >
        <svg
          class="w-5 h-5 mr-2 text-gray-800 fill-current dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
          />
        </svg>
        <a
          :href='user.social_links.twitter'
          target='_blank'
          class='text-gray-800 dark:text-gray-400'
        >{{ fetchUsernameFromUrl(user.social_links.twitter) }}</a
        >
      </div>

      <!-- Info: Education -->
      <div class="flex items-center mb-2" v-if="user.education">
        <svg
          class="w-5 h-5 mr-2 text-gray-800 dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <p class="text-gray-800 dark:text-gray-400">
          {{ user.education }}
        </p>
      </div>

      <!-- Info:location -->
      <div class="flex items-center" v-if="user.location">
        <svg
          class="w-5 h-5 mr-2 text-gray-800 dark:text-gray-400"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <p class="text-gray-800 dark:text-gray-400">{{ user.location }}</p>
      </div>
    </div>

    <div class="flex items-center mt-2" v-if="user.website_url">
      <svg
        stroke="currentColor"
        class="w-5 h-5 mr-2 text-gray-800 dark:text-gray-400"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
        ></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
      <a
        :href="user.website_url"
        target="_blank"
        class="text-gray-800 dark:text-gray-400"
      >
        ব্যক্তিগত ওয়েবসাইট
      </a>
    </div>

    <!-- Info -->
    <div class="mt-5">
      <h3 class="text-base font-bold text-gray-800 dark:text-gray-400">
        আমার অন্যান্য সোশাল লিংকসমুহ
      </h3>

      <div class="flex space-x-2">
        <a
          :href="user.social_links.facebook"
          target="_blank"
          v-if="user.social_links && user.social_links.facebook"
        >
          <svg
            class="w-5 h-5 text-gray-800 fill-current dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"
            />
          </svg>
        </a>

        <a
          :href="user.social_links.stackOverflow"
          target="_blank"
          v-if="user.social_links && user.social_links.stackOverflow"
        >
          <svg
            class="w-5 h-5 text-gray-800 fill-current dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335-1.993.346 1.62 9.335 1.994-.346zm-5.964 6.937l-9.746-.975-.186 2.016 9.755.879.177-1.92zm.538-2.587l-9.276-2.608-.526 1.954 9.306 2.5.496-1.846zm1.204-2.413l-8.297-4.864-1.029 1.743 8.298 4.865 1.028-1.744zm1.866-1.467l-5.339-7.829-1.672 1.14 5.339 7.829 1.672-1.14zm-2.644 4.195v8h-12v-8h-2v10h16v-10h-2z"
            />
          </svg>
        </a>

        <a
          :href="user.social_links.medium"
          target="_blank"
          v-if="user.social_links && user.social_links.medium"
        >
          <svg
            class='w-5 h-5 text-gray-800 fill-current dark:text-gray-400'
            xmlns='http://www.w3.org/2000/svg'
            fill-rule='evenodd'
            clip-rule='evenodd'
          >
            <path
              d='M19 24h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5v14c0 2.761-2.237 4.999-5 5zm.97-5.649v-.269l-1.247-1.224c-.11-.084-.165-.222-.142-.359v-8.998c-.023-.137.032-.275.142-.359l1.277-1.224v-.269h-4.422l-3.152 7.863-3.586-7.863h-4.638v.269l1.494 1.799c.146.133.221.327.201.523v7.072c.044.255-.037.516-.216.702l-1.681 2.038v.269h4.766v-.269l-1.681-2.038c-.181-.186-.266-.445-.232-.702v-6.116l4.183 9.125h.486l3.593-9.125v7.273c0 .194 0 .232-.127.359l-1.292 1.254v.269h6.274z'
            />
          </svg>
        </a>
      </div>
    </div>
  </aside>
  <div v-else class='col-span-12 md:col-span-3'>
    <svg class='text-gray-300 dark:text-gray-600 w-full rounded animate-pulse' viewBox='0 0 278 361' fill='currentColor'
         xmlns='http://www.w3.org/2000/svg'>
      <rect width='278' height='299' rx='5' fill='currentColor' />
      <rect y='313' width='227' height='17' rx='4' fill='currentColor' />
      <rect y='344' width='185' height='17' rx='4' fill='currentColor' />
    </svg>
  </div>
</template>

<script>
import onlineStatus from '~/mixins/isUserOnline'
export default {
  props: ['user'],
  mixins: [onlineStatus],
  methods: {
    fetchUsernameFromUrl(url) {
      const parts = url.split('/')
      return parts[parts.length - 1]
    },
  },
}
</script>
