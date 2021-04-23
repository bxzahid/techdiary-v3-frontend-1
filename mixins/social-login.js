export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    socialLogin(service) {
      this.loading = true
      window.location.href = `${process.env.NUXT_ENV_APP_URL_CLIENT}/api/auth/login/${service}`
    },
  },
}
