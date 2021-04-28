<template>
  <div>
    <slot name='top'></slot>

    <main class='wrapper'>
      <div class='grid grid-cols-12 md:space-x-5'>
        <section class='hidden col-span-12 md:block md:col-span-3'>
          <sidebar-left />
        </section>

        <div class='col-span-12 md:col-span-6'>
          <slot />
        </div>

        <section class='hidden col-span-12 md:block md:col-span-3'>
          <sidebar-right />
        </section>
      </div>

      <footer class='grid place-content-center'>
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

    <slot name="bottom"></slot>
  </div>
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
