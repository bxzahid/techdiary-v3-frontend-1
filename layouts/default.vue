<template>
  <main>
    <Navbar />
    <div class="wrapper">
      <Nuxt />
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
