<template>
  <div>
    <h3 class='text-xl text-gray-500 dark:text-gray-300'>সেশন সমূহ</h3>
    <div class='mt-5 space-y-6' v-if='tokens.length > 0'>
      <div class='flex items-center' v-for='(session, i) in tokens' :key='session.id'>
        <div>
          <svg fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'
               stroke='currentColor' class='w-8 h-8 text-dark' v-if='session.platform["device-type"] === "desktop"'>
            <path
              d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
          </svg>

          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none'
               stroke-linecap='round' stroke-linejoin='round' class='w-8 h-8 text-dark' v-else>
            <path d='M0 0h24v24H0z' stroke='none'></path>
            <rect x='7' y='4' width='10' height='16' rx='1'></rect>
            <path d='M11 5h2M12 17v.01'></path>
          </svg>
        </div>

        <div class='ml-3 w-full sm:max-w-[12rem]'>
          <div class='text-sm text-dark-secondary'>
            {{ session.platform['platform/OS'] }} - {{ session.platform.browser }}
          </div>

          <div>
            <div class='text-xs text-gray-500'>
              <span class='text-green-500 font-semibold' v-if='session.isCurrent'>This device</span>
              <span v-else-if='session.last_used_at'>Last active {{ $moment(session.last_used_at).fromNow() }}</span>
            </div>
          </div>
        </div>

        <button class='rounded-full ml-5 text-red-500' @click='revokeToken(session.id, i)' v-if='!session.isCurrent'>
          <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  head: {
    title: 'Login Sessions'
  },
  data: () => ({
    tokens: []
  }),
  async fetch() {
    const { data: tokens } = await this.$axios.$get('/api/auth/my-tokens')
    this.tokens = tokens
  },
  methods: {
    async revokeToken(id, index) {
      try {
        await this.$axios.$delete(`/api/auth/revoke-token/${id}`)
        this.tokens.splice(index, 1)
      } catch (error) {
      }
    }
  }
}
</script>
