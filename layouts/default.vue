<template>
  <main>
    <Navbar />
    <Nuxt />
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
