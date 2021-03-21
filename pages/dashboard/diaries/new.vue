<template>
  <client-only>
    <editor-app-editor @editorSaved="handleSave" v-model="article" />
  </client-only>
</template>
<script>
import validationHelper from '~/mixins/validationHelper'

export default {
  layout: 'blank',
  head: {
    title: 'নতুন ডায়েরি লিখুন',
  },
  middleware: 'auth',
  mixins: [validationHelper],
  data() {
    return {
      article: {
        body: [],
        tags: [],
        title: '',
        excerpt: '',
        isPublished: true,
        thumbnail: '',
      },
    }
  },
  methods: {
    async handleSave(data) {
      try {
        const article = await this.$axios.$post('/api/articles', { ...data })
        const url = `/${this.$auth.user.username}/${article.data.slug}`
        this.$store.commit(
          'alert/SUCCESS_ALERT',
          `Article saved. <a href='${url}' target='_blank' >Read now</a>`
        )
        this.$router.push({
          name: 'dashboard-diaries-slug-edit',
          params: { slug: article.data.slug },
        })
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
