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
        this.$toast.success('ডায়েরি সংরক্ষণ করা হয়েছে')
        await this.$router.push({
          name: 'username-articleSlug',
          params: { articleSlug: article.data.slug, username: this.$auth.user.username }
        })
      } catch (e) {
        if (e.response.status !== 500) {
          const errors = this.jsonToPlainErrorText(e.response.data?.errors)
          this.$toast.error(errors)
        }
      }
    },
  },
}
</script>
