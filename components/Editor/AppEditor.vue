<template>
  <div>
    <nav
      class='sticky top-0 z-10 mx-auto bg-opacity-50 h-[72px] bg-white dark:bg-gray-900 backdrop-filter backdrop-blur max-w-8xl xl:px-8 firefox:bg-opacity-90 flex items-center justify-between p-8'>
      <nuxt-link
        :to="{ name: 'dashboard-diaries' }"
        class='flex items-center space-x-2 text-dark'
      >
        <svg
          class='w-4 h-4'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M10 19l-7-7m0 0l7-7m-7 7h18'
          />
        </svg>

        <span>ডায়েরি সমূহ</span>
      </nuxt-link>
      <div class='flex items-center space-x-2'>
        <button
          class='flex px-3 py-2 rounded-md items-center space-x-1 justify-center transition duration-150 text-dark opacity-90 transform focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-500'
          @click='openOptions'
        >
          <svg
            class=' stroke-1 w-7'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
            />
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          <span>সেটিংস</span>
        </button>
        <button
          class='flex items-center justify-center px-5 py-1 rounded-full bg-primary'
          @click='save'
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
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span v-if="loading">অপেক্ষা করুন...</span>
          <span v-else>সেভ করুন</span>
        </button>


      </div>
    </nav>
    <!-- ======================================================= -->
    <!-- Editor Content start -->
    <!-- ======================================================= -->
    <div class="max-w-4xl px-3 mx-auto md:px-0">
      <input
        type="text"
        class="w-full text-3xl bg-transparent text-dark focus:outline-none"
        placeholder="ডায়েরির শিরোনাম"
        v-model="article.title"
      />
      <div id='techdiary-editor' class='text-dark td-editor'></div>
    </div>
    <!-- ======================================================= -->
    <!-- Editor Content end -->
    <!-- ======================================================= -->

    <!-- ======================================================= -->
    <!-- Editor Content end -->
    <!-- ======================================================= -->

    <!--    <transition name="slide">-->
    <!--      <div-->
    <!--        ref="editorOptions"-->
    <!--        class="fixed top-0 right-0 z-50 min-h-screen bg-gray-100 border-l dark:border-gray-700 dark:bg-gray-800 w-72 text-dark"-->
    <!--        v-show="showOptions"-->
    <!--      >-->
    <!--        <button-->
    <!--          class="absolute w-8 h-8 text-2xl text-white transition-transform duration-150 transform bg-red-500 rounded-full top-1 right-3 focus:outline-none hover:rotate-180"-->
    <!--          @click="showOptions = false"-->
    <!--        >-->
    <!--          &times;-->
    <!--        </button>-->

    <!--        <editor-meta-->
    <!--          :loading="loading"-->
    <!--          :article="article"-->
    <!--          @saveArticle="() => save()"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </transition>-->
    <div
      class='fixed inset-0 w-full z-30 overflow-y-auto'
      :class='[showOptions ? "visible" : "invisible"]'
    >
      <div
        class='flex items-end justify-end min-h-screen px-4 pt-4 pb-20 text-right mr-3 sm:block sm:p-0'
      >
        <!--
          Background overlay, show/hide based on modal state.
          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <transition enter-active-class='ease-out duration-300'
                    enter-class='opacity-0'
                    enter-to-class='opacity-100'
                    leave-active-class='ease-in duration-200'
                    leave-class='opacity-100' leave-to-class='opacity-0'>
          <div
            class='fixed inset-0 transition-opacity'
            aria-hidden='true'
            v-if='showOptions'
            @click='closeOptions'
          >
            <div class='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>
        </transition>

        <!--
          Modal panel, show/hide based on modal state.
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
        <transition enter-active-class='ease-out duration-300'
                    enter-class='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    enter-to-class='opacity-100 translate-y-0 sm:scale-100' leave-active-class='ease-in duration-200'
                    leave-class='opacity-100 translate-y-0 sm:scale-100'
                    leave-to-class='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
          <div
            class='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-md shadow-xl sm:my-8 max-w-md w-full'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-headline'
            v-if='showOptions'
          >
            <div class='px-4 py-5 bg-white w-full dark:bg-gray-800'>
              <div>
                <div class='mt-3 text-center sm:mt-0 sm:text-left'>
                  <div class='mt-2'>
                    <editor-meta
                      @closeMeta='closeOptions'
                      :loading='loading'
                      :article='article'
                      @saveArticle='() => save()'
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- ======================================================= -->
    <!-- Editor Content end -->
    <!-- ======================================================= -->
  </div>
</template>



<script>
import upload from '~/mixins/upload'
export default {
  props: {
    'article-data': {
      type: Object,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [upload],
  data() {
    return {
      editor: null,
      showOptions: false,
      article: {
        body: this.articleData?.body || [],
        tags: this.articleData?.tags || [],
        title: this.articleData?.title || '',
        excerpt: '',
        isPublished: this.articleData?.isPublished || false,
        thumbnail: this.articleData?.thumbnail || '',
      },
    }
  },
  mounted() {
    const EditorJS = require('@editorjs/editorjs')
    this.editor = new EditorJS({
      data: { blocks: this.article.body },
      /**
       * Id of Element that should contain Editor instance
       */
      holder: 'techdiary-editor',
      placeholder: 'চলুন শুরু করা যাক চমৎকার একটা ডায়েরি 😍',
      tools: {
        /**
         * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
         */
        header: {
          class: require('@editorjs/header'),
          inlineToolbar: ['marker', 'link'],
          config: {
            placeholder: 'Header',
            levels: [2, 3],
          },
          shortcut: 'CMD+SHIFT+H',
        },
        underline: require('@editorjs/underline'),

        image: {
          class: require('@editorjs/image'),
          config: {
            uploader: {
              uploadByFile: async (file) => {
                const url = await this.uploadFile(
                  file,
                  'techdiary-article-assets'
                )

                return {
                  success: 1,
                  file: {
                    url,
                  },
                }
              },
            },
          },
        },

        /**
         * Or pass class directly without any configuration
         */
        //   // image: SimpleImage,

        list: {
          class: require('@editorjs/list'),
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L',
        },
        inlineCode: {
          class: require('@editorjs/inline-code'),
          shortcut: 'CMD+SHIFT+M',
        },
        checklist: {
          class: require('@editorjs/checklist'),
          inlineToolbar: true,
        },

        quote: {
          class: require('@editorjs/quote'),
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author",
          },
          shortcut: 'CMD+SHIFT+O',
        },

        warning: require('@editorjs/warning'),
        linkTool: {
          class: require('@editorjs/link'),
          config: {
            endpoint: `${process.env.NUXT_ENV_APP_URL_CLIENT}/api/fetch-url`,
          },
        },
        marker: {
          class: require('@editorjs/marker'),
          shortcut: 'CMD+SHIFT+M',
        },
        code: require('@/assets/codeTool'),
        embed: require('@editorjs/embed'),
        table: {
          class: require('@editorjs/table'),
          inlineToolbar: true,
          shortcut: 'CMD+ALT+T',
        },
      }, // tools
      onChange: (api) => {
        api.saver.save().then((newData) => {
          this.article.body = newData.blocks
        })
      },
    })
  },
  // beforeDestroy() {
  //   this.editor.destroy()
  // },
  methods: {
    save() {
      this.$emit('editorSaved', this.article)
    },
    openOptions() {
      this.showOptions = true
    },
    closeOptions() {
      this.showOptions = false
    },
    toggleOptions() {
      this.showOptions = !this.showOptions
    }
  },
}
</script>
<!--<script src="https://cdn.jsdelivr.net/gh/paraswaykole/editor-js-code@latest/dist/bundle.js" ></script>-->
<style>
.ce-block__content,
.ce-toolbar__content {
  max-width: unset;
}

.slide-leave-active,
.slide-enter-active {
  transition: 300ms;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
