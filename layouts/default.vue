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
      class: 'font-techdiary',
    },
  },
}
</script>
