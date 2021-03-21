<template>
  <div class="flex flex-col justify-between min-h-screen p-4 overflow-y-auto">
    <div>
      <!-- thumbnail -->
      <EditorThumbnail v-model="article.thumbnail" />

      <div class="my-5">
        <multi-select
          placeholder="ট্যাগ নির্বাচন করুন"
          selectLabel="নির্বাচন করতে এন্টার চাপুন"
          tagPlaceholder="ট্যাগ তৈরি করতে এন্টার চাপুন"
          :options="tagOptions"
          :multiple="true"
          :hideSelected="true"
          :taggable="true"
          :max="10"
          @tag="createNewTag"
          track-by="id"
          label="name"
          v-model="article.tags"
          :closeOnSelect="false"
        ></multi-select>
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="isPublished" v-model="article.isPublished" />
        <label class="ml-2" for="isPublished">Public Diary</label>
      </div>
    </div>

    <button
      @click="$emit('saveArticle')"
      class="w-full py-2 text-gray-700 rounded-sm bg-primary"
    >
      সেভ করুন
    </button>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tagOptions: [],
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
