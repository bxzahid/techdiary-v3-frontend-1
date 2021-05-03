<template>
  <div class="p-3 border border-gray-200 rounded dark:border-gray-700">
    <div class="mb-4 font-semibold text-gray-500 dark:text-gray-300">
      Profile Readme
    </div>
    <div>
      <form action="#" method="POST" @submit.prevent="save">
        <form-textarea
          v-model="form.profile_readme"
          :error="hasError('profile_readme')"
          :helperText="hasErrorMessage('profile_readme')"
          rows="20"
        />

        <div class="flex items-center space-x-4">
          <form-button :loading="loading"> হালনাগাদ </form-button>
          <nuxt-link
            :to="{
              name: 'username',
              params: { username: $auth.user.username },
            }"
            class='px-3 py-1 rounded bg-primary focus:shadow-outline'
          >
            Preview
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import validationHelper from '~/mixins/validationHelper'

export default {
  mixins: [validationHelper],
  data() {
    return {
      form: {
        profile_readme: this.$auth.user?.profile_readme || '',
      },
      loading: false,
    }
  },
  methods: {
    async save() {
      this.loading = true
      try {
        await this.$axios.$post('/api/auth/update-profile', this.form)
        this.$store.commit(
          'alert/SUCCESS_ALERT',
          'Profile readme updated successfully'
        )
        this.loading = false
        this.errors = {}
      } catch (e) {
        this.loading = false
      }
    },
  },
}
</script>
