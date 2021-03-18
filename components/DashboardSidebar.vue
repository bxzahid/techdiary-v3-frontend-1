<template>
  <div>
    <div class="mb-5">
      <h3 class="mb-3 text-sm font-bold text-gray-500 dark:text-gray-300">
        আমার ডায়েরি
      </h3>

      <nuxt-link
        :to="{ name: 'dashboard-diaries' }"
        class="sidebar__link"
        exact-active-class="sidebar__link--active"
      >
        <svg
          class="w-4 h-4"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>

        <span class="inline-block ml-2">সকল ডায়েরি</span>
      </nuxt-link>

      <nuxt-link :to="{ name: 'dashboard-diaries-new' }" class="sidebar__link">
        <svg
          class="w-4 h-4"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
          ></path>
        </svg>
        <span class="inline-block ml-2">নতুন ডায়েরি</span>
      </nuxt-link>
      <a href="#" class="sidebar__link">
        <svg
          class="w-4 h-4"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="10" y1="15" x2="10" y2="9"></line>
          <line x1="14" y1="15" x2="14" y2="9"></line>
        </svg>

        <span class="inline-block ml-2">প্রকাশিত ডায়েরি</span>
      </a>

      <nuxt-link
        href="#"
        class="sidebar__link"
        :to="{ name: 'dashboard-sessions' }"
      >
        <svg
          class="w-4 h-4"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="inline-block ml-2">বুকমার্ক সমূহ</span>
      </nuxt-link>
    </div>

    <div class="mb-5">
      <h3 class="mb-3 text-sm font-bold text-gray-500 dark:text-gray-300">
        আমার পছন্দ
      </h3>

      <a href="#" class="sidebar__link">
        <svg
          class="w-4 h-4"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ></path>
        </svg>
        <span class="inline-block ml-2">পছন্দকৃত ডায়েরি</span>
      </a>
    </div>

    <div class="mb-5">
      <h3 class="mb-3 text-sm font-bold text-gray-500 dark:text-gray-300">
        সেটিংস
      </h3>

      <nuxt-link
        class="sidebar__link"
        :to="{ name: 'dashboard-settings' }"
        exact-active-class="sidebar__link--active"
      >
        <svg
          class="w-4 h-4"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
          ></path>
        </svg>
        <span class="inline-block ml-2">প্রোফাইল হালনাগাদ</span>
      </nuxt-link>
      <a href="#" class="sidebar__link">
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sidebar__label">API Keys</span>
      </a>
      <nuxt-link
        title="Sessions"
        :to="{ name: 'dashboard-sessions' }"
        class="sidebar__link"
        exact-active-class="sidebar__link--active"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <span class="sidebar__label">Sessions</span>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  &__icon {
    @apply w-4 h-4;
  }
  &__link {
    @apply flex items-center p-1 mb-1 dark:text-gray-300;
    &--active {
      @apply rounded bg-paste-300 dark:text-gray-800;
    }
  }
  &__label {
    @apply inline-block ml-2;
  }
}
</style>
