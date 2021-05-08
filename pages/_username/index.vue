<template>
  <main class="col-span-12 md:col-span-9 md:px-4">
    <div>
      <div class="readme-content dark:bg-gray-800">
        <div class="markdown" v-html="user && user.profile_readme"></div>
      </div>
    </div>
  </main>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'profile',
  computed: {
    ...mapState({ user: (state) => state.publicUser.user }),
  },
  head() {
    return {
      title: this.user?.username,
      bodyAttrs: {
        class: 'bg-gray-100 dark:bg-gray-700',
      },
    }
  },
}
</script>
