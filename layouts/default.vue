<template>
  <main>
    <Navbar />
    <Nuxt />
    <footer class='grid place-content-center mb-4'>
      <div class='mb-2'>
        <nuxt-link
          :to="{ name: 'pages-slug', params: { slug: 'privacy-policy' } }"
          class='text-sm text-gray-600'
        >
          Privacy Policy
        </nuxt-link>

        <span class='seperator'> · </span>

        <nuxt-link
          :to="{ name: 'pages-slug', params: { slug: 'terms-and-conditions' } }"
          class='text-sm text-gray-600'
        >
          Terms & Conditions
        </nuxt-link>
        <span class='seperator'> · </span>

        <nuxt-link
          :to="{ name: 'pages-slug', params: { slug: 'about' } }"
          class='text-sm text-gray-600'
        >
          About Us
        </nuxt-link>
      </div>
    </footer>
  </main>
</template>

<script>
export default {
  head: () => ({
    bodyAttrs: {
      class: 'techdiary-body'
    }
  }),
  mounted() {
    this.$auth.fetchUser()
  }
}
</script>
