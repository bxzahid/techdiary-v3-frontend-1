<template>
  <aside class="col-span-12 mb-5 md:mb-0 md:col-span-3" v-if="user">
    <div class="rounded w-72 md:w-full" v-if="user.profilePhoto">
      <div class="object-cover w-full h-auto overflow-hidden rounded">
        <image-widget
          crop="scale"
          width="300"
          fetchFormat="auto"
          quality="auto"
          loading="lazy"
          :imageUrl="user.profilePhoto"
          :alt="user.username"
        />
      </div>
    </div>

    <div class="mt-5">
      <h2 class="flex items-center text-2xl dark:text-gray-200">
        <span
          class="inline-block w-2 h-2 mr-2 rounded-full"
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
      <p class="mt-2 dark:text-gray-300">
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
        <IconGithub />
        <a
          target="_blank"
          :href="user.social_links.github"
          class="text-gray-800 dark:text-gray-400"
          >{{ fetchUsernameFromUrl(user.social_links.github) }}</a
        >
      </div>

      <!-- Info: Twitter -->
      <div
        class="flex items-center mb-2"
        v-if="user.social_links && user.social_links.twitter"
      >
        <IconTwitter />
        <a
          :href="user.social_links.twitter"
          target="_blank"
          class="text-gray-800 dark:text-gray-400"
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
        <p class="text-gray-800 dark:text-gray-400">{{ user.education }}</p>
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
            class="w-5 h-5 text-gray-800 fill-current dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M19 24h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5v14c0 2.761-2.237 4.999-5 5zm.97-5.649v-.269l-1.247-1.224c-.11-.084-.165-.222-.142-.359v-8.998c-.023-.137.032-.275.142-.359l1.277-1.224v-.269h-4.422l-3.152 7.863-3.586-7.863h-4.638v.269l1.494 1.799c.146.133.221.327.201.523v7.072c.044.255-.037.516-.216.702l-1.681 2.038v.269h4.766v-.269l-1.681-2.038c-.181-.186-.266-.445-.232-.702v-6.116l4.183 9.125h.486l3.593-9.125v7.273c0 .194 0 .232-.127.359l-1.292 1.254v.269h6.274z"
            />
          </svg>
        </a>
        <a
          target="_blank"
          :href="user.social_links.behance"
          v-if="user.social_links && user.social_links.behance"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-800 fill-current dark:text-gray-400"
            viewBox="0 0 24 24"
          >
            <path
              d="M8.228 15.01h-2.228v-2.01h2.261c1.878 0 2.003 2.01-.033 2.01zm6.758-2.677h3.018c-.117-1.715-2.73-1.977-3.018 0zm-6.804-3.333h-2.182v2h2.389c1.673 0 1.937-2-.207-2zm15.818-4v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5zm-10 3h5v-1h-5v1zm-3.552 3.618c1.907-.974 1.837-4.55-1.813-4.604h-4.635v9.978h4.311c4.522 0 4.445-4.534 2.137-5.374zm9.487.602c-.274-1.763-1.528-2.95-3.583-2.95-2.094 0-3.352 1.34-3.352 3.947 0 2.631 1.367 3.783 3.416 3.783s3.106-1.135 3.4-2h-2.111c-.736.855-2.893.521-2.767-1.353h5.06c.01-.634-.012-1.089-.063-1.427z"
            />
          </svg>
        </a>
        <a
          target="_blank"
          :href="user.social_links.dribbble"
          v-if="user.social_links && user.social_links.dribbble"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-800 fill-current dark:text-gray-400"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"
            />
          </svg>
        </a>
        <a
          target="_blank"
          :href="user.social_links.twitch"
          v-if="user.social_links && user.social_links.twitch"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-800 fill-current dark:text-gray-400"
            viewBox="0 0 24 24"
          >
            <path
              d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <a
          target="_blank"
          :href="user.social_links.twitch"
          v-if="user.social_links && user.social_links.twitch"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-800 fill-current dark:text-gray-400"
            viewBox="0 0 24 24"
          >
            <path
              d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
            />
          </svg>
        </a>
      </div>
    </div>
  </aside>

  <div v-else class="col-span-12 md:col-span-3">
    <skelleton-user-profile-sidebar />
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
