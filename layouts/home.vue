<template>
  <main>
    <Navbar />

    <hero v-if="!$auth.loggedIn" />

    <div class="wrapper">
      <div class="grid grid-cols-12 md:space-x-5">
        <div class="hidden col-span-12 md:block md:col-span-3">
          <widgets-selected-tags />
        </div>
        <div class="col-span-12 md:col-span-6">
          <Nuxt />
        </div>

        <div class="hidden col-span-12 md:block md:col-span-3">
          <widgets-login v-if="!$auth.loggedIn" class="mb-8" />
          <widgets-online-users class="mb-4" v-if="$auth.loggedIn" />
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
      class: 'techdiary-body',
    },
  },
}
</script>
