<template>
  <div class="fixed top-0 left-0 z-50 w-full">
    <alert-popup />

    <client-only>
      <modal />
    </client-only>

    <div
      class="flex items-center justify-between px-4 py-1 bg-white shadow-sm md:px-10 dark:bg-gray-800 h-14"
    >
      <nuxt-link :to="{ name: 'index' }">
        <navbar-logo />
      </nuxt-link>

      <navbar-search />

      <div class="flex items-center justify-end">
        <navbar-links class="mr-5" />
        <navbar-user-action />
      </div>
    </div>
  </div>
</template>
