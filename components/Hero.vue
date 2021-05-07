<template>
  <div class="bg-secondary dark:bg-gray-800">
    <div
      class="w-full py-6 min-h-[40vh] mt-14 grid items-center place-content-center lg:grid-cols-12"
    >
      <div
        class="grid col-span-12 mb-8 text-center place-content-center lg:col-span-3 lg:col-start-4"
      >
        <HeroArt />
      </div>

      <div class="col-span-12 lg:col-span-6">
        <h1 class="text-xl font-thin md:text-3xl text-dark">
          বাংলার প্রোগ্রামিং নেটওয়ার্ক
        </h1>
        <p
          class="mt-3 space-x-3 text-sm uppercase md:text-lg text-dark-secondary"
        >
          <span># ব্লগ</span>
          <span># টিউটোরিয়াল</span>
          <span># চ্যালেঞ্জ</span>
          <span># আলোচনা</span>
        </p>
        <modal :show="visible" @close="closeModal" />
        <div class="mt-5">
          <button
            @click="visible = true"
            class="flex items-center w-auto space-x-2 font-bold border-gray-700 rounded dark:border-gray-50 text-dark-secondary"
          >
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              class="text-dark-secondary"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <span class="text-xs md:text-lg">যুক্ত হোন</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SocialLogin from '~/mixins/social-login'
import HeroArt from '~/static/hero-art.svg?inline'
export default {
  mixins: [SocialLogin],
  data() {
    return {
      visible: false,
    }
  },
  components: {
    HeroArt,
  },
  methods: {
    closeModal() {
      this.visible = false
    },
  },
}
</script>
