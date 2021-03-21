<template>
  <Fragment>
    <div
      class="flex items-center justify-center h-40 overflow-hidden bg-gray-300 rounded dark:bg-gray-700"
      v-bind="$attrs"
    >
      <input
        type="file"
        class="hidden w-0 h-0"
        ref="thumbnailFileInput"
        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
        @change="handleUploadImage"
      />
      <!-- Preview Thumbnail -->
      <div
        @click="removeThumbnail"
        v-if="thumbnail"
        class="flex items-center justify-center w-full h-full bg-cover"
        :style="{ 'background-image': `url(${thumbnail})` }"
      >
        <button class="text-3xl font-bold text-red-500 focus:outline-none">
          &times;
        </button>
      </div>

      <button
        class="flex-col items-center justify-center focus:outline-none"
        v-if="!thumbnail"
        @click="openUploadWindow"
      >
        <svg
          v-if="!loading"
          class="w-4 h-4 mx-auto mb-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        <svg
          v-if="loading"
          class="w-4 h-4 mx-auto animate-spin"
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
        <p>{{ loading ? 'অপেক্ষা করুন' : 'কভার ছবি' }}</p>
      </button>
    </div>
    <input
      type="text"
      v-model="thumbnail"
      class="w-full px-1 py-2 focus:outline-none"
      placeholder="ছবির লিংক"
    />
  </Fragment>
</template>
<script>
import upload from '~/mixins/upload'
export default {
  props: ['value'],
  mixins: [upload],
  data() {
    return {
      thumbnail: this.value,
      loading: false,
    }
  },
  watch: {
    thumbnail(newVal) {
      this.$emit('input', newVal)
    },
  },

  methods: {
    removeThumbnail() {
      this.thumbnail = ''
      this.loading = false
    },
    async handleUploadImage(event) {
      this.loading = true
      const file = event.target.files[0]
      if (!file) return

      this.thumbnail = await this.uploadFile(file, 'techdiary-article-covers')
      this.loading = false
    },
    openUploadWindow() {
      this.$refs.thumbnailFileInput.click()
    },
  },
}
</script>
