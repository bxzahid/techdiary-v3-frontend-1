<template>
  <div class='flex flex-col min-h-[80vh] overflow-y-auto'>
    <div class='flex justify-between'>
      <button @click='closeMeta' class='grid place-content-center bg-red-500 text-white rounded-md p-2'>
        <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>

      <button
        @click="$emit('saveArticle')"
        class='flex items-center justify-center px-5 py-1 text-gray-700 rounded-full bg-primary'
      >
        <svg
          v-if='loading'
          class='w-5 h-5 mr-2 animate-spin'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            class='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            stroke-width='4'
          ></circle>
          <path
            class='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
        <span v-if='loading'>অপেক্ষা করুন</span>
        <span v-else>সেভ করুন</span>
      </button>
    </div>
    <div class='mt-4'>

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
      <div class='flex items-center text-dark ml-2'>
        <input type='checkbox' class='text-primary rounded' id='isPublished' v-model='article.isPublished' />
        <label class='ml-2' for='isPublished'>Public Diary</label>
      </div>
    </div>


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
    closeMeta() {
      this.$emit('closeMeta')
    }
  },
}
</script>
