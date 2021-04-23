<template>
  <div class="bg-secondary dark:bg-gray-800">
    <div class="wrapper">
      <div class="grid items-center grid-cols-12 techdiary-hero">
        <div class="col-span-6">
          <div>
            <h1 class="text-5xl font-thin text-dark">
              বাংলার প্রোগ্রামিং নেটয়ার্ক
            </h1>
            <h2 class="mt-5 space-x-3 text-2xl uppercase text-dark-secondary">
              <span>#ব্লগ</span>
              <span>#টিটরিয়াল</span>
              <span>#চ্যালেঞ্জ</span>
              <span>#আলোচনা</span>
            </h2>
          </div>

          <button
            @click="socialLogin('github')"
            class="flex px-3 py-2 mt-5 space-x-2 border border-gray-700 rounded dark:border-gray-50 text-dark-secondary"
          >
            <svg
              v-if="loading"
              class="w-5 h-5 mr-2 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>যুক্ত হোন</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SocialLogin from '~/mixins/social-login'
export default {
  mixins: [SocialLogin],
}
</script>

<style lang="scss" scoped>
.techdiary-hero {
  height: 15rem;
  // background-image: url(https://cdn.hashnode.com/res/hashnode/image/upload/v1611214716159/WVCkO7taM.png?auto=compress);
  background-size: 100%;
}
</style>
