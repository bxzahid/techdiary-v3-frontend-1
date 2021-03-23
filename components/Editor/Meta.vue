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
      class="flex items-center justify-center w-full py-2 text-gray-700 rounded-sm bg-primary"
    >
      <svg
        v-if="loading"
        class="w-5 h-5 mr-2 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span v-if="loading">অপেক্ষা করুন</span>
      <span v-else>সেভ করুন</span>
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tagOptions: [],
      loading: false,
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
