<template>
  <Fragment>
    <h3 class="text-lg">সর্বশেষ নিবন্ধিত ব্যবহারকারী</h3>

    <div>
      <div v-for="user in users" :key="user.id" class="flex items-center my-4">
        <nuxt-link
          :to="{ name: 'username', params: { username: user.username } }"
        >
          <img
            class="w-10 h-10 rounded-full"
            :src="user.profilePhoto"
            alt="user.username"
          />
        </nuxt-link>

        <div class="ml-2">
          <h3 class="text-lg">
            <nuxt-link
              :to="{ name: 'username', params: { username: user.username } }"
            >
              {{ user.name }}
            </nuxt-link>
          </h3>
          <p class="text-sm text-gray-600">
            {{ $moment(user.joined).fromNow() }}
          </p>
        </div>
      </div>
    </div>
  </Fragment>
</template>

<script>
export default {
  async fetch() {
    const { data: users } = await this.$axios.$get('/api/users?limit=5')
    this.users = users
  },

  data() {
    return {
      users: [],
    }
  },
}
</script>
