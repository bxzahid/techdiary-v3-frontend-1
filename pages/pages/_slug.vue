<template>
  <div class="wrapper">
    <div class="grid grid-cols-12 space-x-5">
      <div class="col-span-3">
        <static-pages-list />
      </div>
      <div class="col-span-8">
        <h2 class="text-xl md:text-3xl dark:text-gray-300">
          {{ page.title }}
        </h2>
        <p class="my-4 italic text-dark-secondary">
          <span class="pr-1 font-bold">সর্বশেষ সংস্কারকরন:</span>
          {{ $moment(page.updatedAt).format('LLLL') }}
        </p>

        <!-- TOC -->
        <div class="my-10">
          <h3 class="inline-block mb-2 text-xl font-bold text-dark">
            সূচিপত্র
          </h3>
          <ul>
            <li v-for="link in page.toc" :key="link.id">
              <a class="text-base text-green-500" :href="`#${link.id}`">
                # {{ link.text }}
              </a>
            </li>
          </ul>
        </div>

        <div class="content-typography text-dark">
          <nuxt-content :document="page" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.page.title,
    }
  },
  async asyncData({ $content, error, params }) {
    try {
      const page = await $content('pages', params.slug).fetch()
      return { page }
    } catch (e) {
      return error({
        statusCode: 404,
        message: 'পেইজ খুঁজে পাওয়া ',
      })
    }
  },
}
</script>
