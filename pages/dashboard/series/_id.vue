<template>
  <div>
    <form action="#" method="post" @submit.prevent="save">
      <form-input
        v-model="form.name"
        label="সিরিজের নাম"
        class="mb-3"
        placeholder="সিরিজের নাম"
        type="text"
        :required="false"
        :error="hasError('name')"
        :helperText="hasErrorMessage('name')"
      />
      <form-textarea
        v-model="form.description"
        label="সিরিজ সম্পর্কে কিছু কথা"
        class="mb-3"
        placeholder="সিরিজ সম্পর্কে কিছু কথা"
        type="text"
        :error="hasError('description')"
        :helperText="hasErrorMessage('description')"
      />

      <form-button :loading="loading">সেভ করুন</form-button>
    </form>

    <draggable v-model="list">
      <h1 v-for="l in list" :key="l">list item: {{ l }}</h1>
    </draggable>
  </div>
</template>

<script>
import validationHelper from '~/mixins/validationHelper'
import draggable from 'vuedraggable'
export default {
  mixins: [validationHelper],
  layout: 'dashboard',
  components: {
    draggable,
  },
  data() {
    return {
      form: {
        name: '',
        cover: '',
        icon: '',
        description: '',
      },
      loading: false,
      list: {},
    }
  },
  async asyncData({ $axios, error, params }) {
    try {
      const { data: form } = await $axios.$get(`/api/series/${params.id}`)
      return { form }
    } catch (e) {
      error({
        statusCode: e.response?.status,
        message: e.response.data?.message,
      })
    }
  },
  methods: {
    async save() {
      this.loading = true
      try {
        const series = await this.$axios.$put(
          `/api/series/${this.$route.params.id}`,
          this.form
        )
        this.loading = false
      } catch (e) {
        if (e.response.data.errors) this.errors = e.response.data.errors
        this.loading = false
      }
    },
  },
}
</script>
