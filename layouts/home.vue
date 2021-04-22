<template>
  <main>
    <Navbar />
    <div class="wrapper">
      <div class="grid grid-cols-12">
        <div class="col-span-12 md:col-span-6 md:px-4">
          <Nuxt />
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
