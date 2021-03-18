<template>
  <div class="flex mb-4 border-b">
    <!-- tab -->
    <nuxt-link
      :to="{ name: 'username', params: { username } }"
      exact-active-class="active-tab"
    >
      <div
        class="flex items-center pb-2 mr-3 cursor-pointer profile-tab-button"
      >
        <svg
          width="20"
          class="mr-2 text-gray-800 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>প্রোফাইল</span>
      </div>
    </nuxt-link>
    <!-- tab -->
    <nuxt-link
      :to="{ name: 'username-diaries', params: { username } }"
      exact-active-class="active-tab"
    >
      <div
        class="flex items-center pb-2 border-b-2 border-transparent cursor-pointer profile-tab-button"
      >
        <svg
          width="20"
          class="mr-2 text-gray-800 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <span>ডায়েরি</span>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: ['username'],
}
</script>

<style lang="scss">
.active-tab {
  .profile-tab-button {
    @apply border-b-2 border-primary;
  }
}
</style>
