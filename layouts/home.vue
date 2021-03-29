<template>
  <main>
    <Navbar />
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
          <widgets-login v-if="!$auth.loggedIn" class="mb-8" />
          <widgets-online-users class="mb-4" v-if="$auth.loggedIn" />
          <widgets-latest-registered-users />
        </div>
      </div>
    </div>
    <beta-warning />
  </main>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'techdiary-body',
    },
  },
}
</script>
