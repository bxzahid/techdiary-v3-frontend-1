<template>
  <main>
    <Navbar />
    <hero v-if="!$auth.loggedIn" />
    <div class="wrapper">
      <div class="grid grid-cols-12 md:space-x-5">
        <div class="hidden col-span-12 md:block md:col-span-3">
          <sidebar-left />
        </div>
        <div class="col-span-12 md:col-span-6">
          <Nuxt />
        </div>

        <div class="hidden col-span-12 md:block md:col-span-3">
          <sidebar-right />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'techdiary-body'
    }
  },
}
</script>
