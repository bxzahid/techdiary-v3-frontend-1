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
    <div
      v-for="key in Object.keys(form.articles)"
      :key="key"
      class="min-h-[25px] p-4 mb-6 "
    >
      <h3 class="mt-5 text-xl capitalize">{{ key }}</h3>
      <draggable
        @move="handleMove"
        v-model="form.articles[key]"
        :group="{ name: 'g1' }"
        class="p-4 border-2 border-dashed "
        tag="ul"
      >
        <li v-for="(child, index) in form.articles[key]" :key="index">
          {{ child.article_id }}
        </li>
      </draggable>
    </div>
  </div>
</template>

<script>
import validationHelper from '~/mixins/validationHelper'
import draggable from 'vuedraggable'
export default {
  mixins: [validationHelper],
  layout: 'dashboard',
  components: {
    draggable
  },
  data() {
    return {
      form: {
        name: '',
        cover: '',
        icon: '',
        description: '',
        articles: {
          general: [
            {
              id: 6,
              name: 'general',
              series_id: '15fb4b72-72d4-448b-93c8-59d14f2820b0',
              article_id: 'e066e2c4-77b5-4f5a-9ca7-6a77a1767e9c',
              series_order: 7
            },
            {
              id: 5,
              name: 'general',
              series_id: '15fb4b72-72d4-448b-93c8-59d14f2820b0',
              article_id: 'e066e2c4-77b5-4f5a-9ca7-6a77a1767e9c',
              series_order: 9
            },
            {
              id: 4,
              name: 'general',
              series_id: '15fb4b72-72d4-448b-93c8-59d14f2820b0',
              article_id: 'e066e2c4-77b5-4f5a-9ca7-6a77a1767e9c',
              series_order: 10
            }
          ]
        }
      },
      loading: false
    }
  },
  async asyncData({ $axios, error, params }) {
    try {
      const { data: form } = await $axios.$get(`/api/series/${params.id}`)
      return { form }
    } catch (e) {
      error({
        statusCode: e.response?.status,
        message: e.response.data?.message
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
        this.$toast.success('সিরিজ হালনাগাদ হয়েছে')
        this.errors = {}
      } catch (e) {
        if (e.response.data.errors) this.errors = e.response.data.errors
        this.loading = false
      }
    },
    handleMove(evt, originalEvent) {}
  }
}
</script>
