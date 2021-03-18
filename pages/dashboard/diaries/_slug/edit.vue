<template>
  <client-only>
    <editor-app-editor @editorSaved="handleUpdate" :article-data="article" />
  </client-only>
</template>
<script>
import validationHelper from '~/mixins/validationHelper'
export default {
  layout: 'blank',
  mixins: [validationHelper],
  mode: 'spa',
  middleware: 'auth',
  head: {
    title: 'Edit ডায়েরি',
  },
  data() {
    return {
      article: {},
    }
  },

  async asyncData({ $axios, error, params }) {
    try {
      const { data: article } = await $axios.$get(
        `/api/articles/${params.slug}`
      )
      return { article }
    } catch (e) {
      error({
        statusCode: e.response?.status,
        message: e.response.data?.message,
      })
    }
  },
  methods: {
    async handleUpdate(data) {
      try {
        const article = await this.$axios.$put(
          `/api/articles/${this.$route.params.slug}`,
          { ...data }
        )
        const url = `/${this.$auth.user.username}/${article.data.slug}`
        this.$store.commit(
          'alert/SUCCESS_ALERT',
          `Article saved. <a href='${url}' target='_blank' >Read now</a>`
        )
      } catch (e) {
        if (e.response.status !== 500) {
          const errors = this.jsonToPlainErrorText(e.response.data?.errors)
          this.$store.commit('alert/ERROR_ALERT', errors)
        }
      }
    },
  },
}
</script>
