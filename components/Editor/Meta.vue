<template>
  <div class='min-h-screen p-4 overflow-y-auto mt-7'>
    <!-- thumbnail -->
    <EditorThumbnail v-model='article.thumbnail' />

    <div class='my-5'>
      <multi-select
        placeholder='ট্যাগ নির্বাচন করুন'
        selectLabel='নির্বাচন করতে এন্টার চাপুন'
        tagPlaceholder='ট্যাগ তৈরি করতে এন্টার চাপুন'
        :options='tagOptions'
        :multiple='true'
        :hideSelected='true'
        :taggable='true'
        :max='10'
        @tag='createNewTag'
        track-by='id'
        label='name'
        v-model='article.tags'
        :closeOnSelect='false'
      ></multi-select>
    </div>
    <div class='my-5'>
      <text-area v-model='article.excerpt' label='excerpt' />
    </div>
    <div class='flex'>
      <input type='checkbox' id='checkbox' v-model='article.isPublished'>
      <label class='ml-2'>Public</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tagOptions: []
    }
  },
  async mounted() {
    const { data } = await this.$axios.$get('/api/tags')
    this.tagOptions = data
  },
  methods: {
    async createNewTag(name) {
      const { data } = await this.$axios.$post('/api/tags', { name })

      this.tagOptions.push(data)
      this.article.tags.push(data)
    },

  },
}
</script>
