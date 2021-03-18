<template>
  <main>
    <Navbar />
    <Hero />
    <div class="wrapper">
      <div class="grid grid-cols-12">
        <div class="hidden col-span-12 md:block md:col-span-3">
          <widgets-featured-tags-article />
          <widgets-featured-tags-article />
          <widgets-featured-tags-article />
          <widgets-featured-tags-article />
        </div>

        <div class="col-span-12 md:col-span-6 md:px-4">
          <Nuxt />
        </div>

        <div class="hidden col-span-12 md:block md:col-span-3">
          <widgets-login v-if="!$auth.loggedIn" class="mb-4" />
          <widgets-online-users class="mb-4" />
          <widgets-latest-registered-users />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'dark:bg-gray-900 font-techdiary',
    },
  },
}
</script>
