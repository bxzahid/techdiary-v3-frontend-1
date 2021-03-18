<template>
  <div>
    <h3 class="text-xl text-gray-500 dark:text-gray-300">Sessins</h3>
    <div
      class="flex w-4/5 p-2 space-x-4 border-b"
      :class="{
        'bg-green-200': token.isCurrent,
        'text-gray-500 dark:text-gray-300': !token.isCurrent,
      }"
      v-for="(token, index) in tokens"
      :key="token.id"
    >
      <div>
        <p>ব্রাউজার: {{ token.platform.browser }}</p>
        <p>অপারেটিং সিস্টেম: {{ token.platform['platform/OS'] }}</p>
        <p>ডিভাইসের ধরন: {{ token.platform['device-type'] }}</p>
        <button
          v-if="!token.isCurrent"
          class="font-bold text-red-500"
          @click="revokeToken(token.id, index)"
        >
          লগআউট
        </button>
      </div>
      <div>
        <p>
          সর্বশেষ ব্যবহার হয়েছে: {{ $moment(token.last_used_at).fromNow() }}
        </p>
        <p>লগইন করা হয়েছিল: {{ token.created_at }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'dashboard',
  head: {
    title: 'Login Sessions',
  },
  data: () => ({
    tokens: [],
  }),
  async asyncData({ $axios }) {
    const { data: tokens } = await $axios.$get('/api/auth/my-tokens')
    return { tokens }
  },
  methods: {
    async revokeToken(id: number, index: number) {
      try {
        await this.$axios.$delete(`/api/auth/revoke-token/${id}`)
        this.tokens.splice(index, 1)
      } catch (error) {}
    },
  },
})
</script>
