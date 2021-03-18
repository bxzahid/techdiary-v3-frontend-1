<template>
  <main>
    <Alert />
    <Navbar />
    <div class="wrapper">
      <Nuxt />
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
