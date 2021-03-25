<template>
  <div class="my-7">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <img
          :src="comment.user.profilePhoto"
          class="w-10 h-10 bg-gray-300 rounded-full"
        />
        <div>
          <p class="ml-3 font-techdiary text-dark">{{ comment.user.name }}</p>
          <p class="pl-3 text-sm text-dark">
            {{ $moment(comment.created_at).fromNow() }}
          </p>
        </div>
      </div>
      <div class="relative" v-click-away="closeDropdown" v-if="$auth.loggedIn">
        <svg
          class="w-10 h-10 cursor-pointer text-dark"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="!editComment"
          @click="dropDownOpen = !dropDownOpen"
        >
          <!--        <rect x='0.219666' width='24' height='24' fill='white' />-->
          <path
            d="M11.7197 8.5V8.505V8.5ZM11.7197 12V12.005V12ZM11.7197 15.5V15.505V15.5ZM11.7197 9C11.5871 9 11.4599 8.94732 11.3661 8.85355C11.2723 8.75979 11.2197 8.63261 11.2197 8.5C11.2197 8.36739 11.2723 8.24021 11.3661 8.14645C11.4599 8.05268 11.5871 8 11.7197 8C11.8523 8 11.9795 8.05268 12.0732 8.14645C12.167 8.24021 12.2197 8.36739 12.2197 8.5C12.2197 8.63261 12.167 8.75979 12.0732 8.85355C11.9795 8.94732 11.8523 9 11.7197 9ZM11.7197 12.5C11.5871 12.5 11.4599 12.4473 11.3661 12.3536C11.2723 12.2598 11.2197 12.1326 11.2197 12C11.2197 11.8674 11.2723 11.7402 11.3661 11.6464C11.4599 11.5527 11.5871 11.5 11.7197 11.5C11.8523 11.5 11.9795 11.5527 12.0732 11.6464C12.167 11.7402 12.2197 11.8674 12.2197 12C12.2197 12.1326 12.167 12.2598 12.0732 12.3536C11.9795 12.4473 11.8523 12.5 11.7197 12.5ZM11.7197 16C11.5871 16 11.4599 15.9473 11.3661 15.8536C11.2723 15.7598 11.2197 15.6326 11.2197 15.5C11.2197 15.3674 11.2723 15.2402 11.3661 15.1464C11.4599 15.0527 11.5871 15 11.7197 15C11.8523 15 11.9795 15.0527 12.0732 15.1464C12.167 15.2402 12.2197 15.3674 12.2197 15.5C12.2197 15.6326 12.167 15.7598 12.0732 15.8536C11.9795 15.9473 11.8523 16 11.7197 16Z"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          class="w-5 h-5 text-red-500 cursor-pointer"
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="editComment = false"
          v-if="editComment"
        >
          <path
            d="M10.5942 0.5L0.594177 10.5"
            stroke="#EF4444"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M0.594177 0.5L10.5942 10.5"
            stroke="#EF4444"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <!--Dropdown-->
        <transition name="fade">
          <div
            v-if="dropDownOpen"
            class="comment-body-dropdown"
            @click.capture="closeDropdown"
          >
            <button
              v-if="canBeModified"
              @click="editComment = true"
              class="flex items-center w-full px-2 py-1 transition duration-200 rounded text-dark hover:bg-primary hover:text-white"
            >
              Edit
            </button>
            <button
              v-if="canBeModified"
              @click="deleteComment"
              class="flex items-center w-full px-2 py-1 transition duration-200 rounded text-dark hover:bg-red-600 hover:text-white"
            >
              Delete
            </button>
          </div>
        </transition>
      </div>
      <!--      end of dropdown-->
    </div>

    <p class="pl-3 my-3 text-dark" v-if="!editComment">{{ comment.body }}</p>
    <div v-if="editComment">
      <textarea
        name="editComment"
        class="w-full p-2 mb-0 rounded-tl rounded-tr shadow-md outline-none text-dark dark:bg-gray-700 bg-gray-50"
        rows="5"
        v-model="commentBody"
      ></textarea>
      <button class="px-3 py-2 rounded bg-primary" @click="updateComment">
        Submit
      </button>
    </div>

    <div class="flex items-center justify-between px-3">
      <!--      Reaction section goes here-->
      <div></div>
      <!--      <div class='flex'>-->
      <!--        <img-->
      <!--          class='w-5 h-5'-->
      <!--          src='~/static/reactions/HEART.png'-->
      <!--        />-->
      <!--        <div class='w-2'></div>-->

      <!--        <svg class='w-5 h-5' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>-->
      <!--          <path d='M13 7.03125H1M7 1.03125V13.0312V1.03125Z' stroke='#71717A' stroke-linecap='round'-->
      <!--                stroke-linejoin='round' />-->
      <!--        </svg>-->
      <!--      </div>-->
      <!--      End of Reaction section-->
      <!--      Reply icon-->
      <span @click="replyTextarea = !replyTextarea" v-if="$auth.loggedIn">
        <svg
          class="w-5 h-5 text-dark"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="!replyTextarea && showReplyButton"
        >
          <path
            d="M0.590393 5.47575H8.36817C10.0184 5.47575 11.6011 6.1313 12.7679 7.2982C13.9348 8.46509 14.5904 10.0477 14.5904 11.698V13.2535M0.590393 5.47575L5.25706 10.1424M0.590393 5.47575L5.25706 0.809082"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          class="w-5 h-5 text-red-500"
          viewBox="0 0 12 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="replyTextarea && showReplyButton"
        >
          <path
            d="M10.5942 0.5L0.594177 10.5"
            stroke="#EF4444"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M0.594177 0.5L10.5942 10.5"
            stroke="#EF4444"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <!-- end of reply icon-->
    </div>
    <div v-if="showReplyButton && replyTextarea">
      <div class="relative my-2">
        <textarea
          name="reply"
          rows="5"
          v-model="replyText"
          class="w-full p-2 mb-0 rounded-tl rounded-tr shadow-md outline-none dark:bg-gray-700 bg-gray-50"
        />
        <div
          class="absolute bottom-0 w-full p-1 bg-gray-300 rounded-bl rounded-br"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.2135 10.3335V13.4446C15.2135 13.8572 15.0496 14.2528 14.7579 14.5446C14.4662 14.8363 14.0705 15.0002 13.6579 15.0002H2.76906C2.3565 15.0002 1.96084 14.8363 1.66911 14.5446C1.37739 14.2528 1.2135 13.8572 1.2135 13.4446V10.3335"
              stroke="#71717A"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.1023 4.88889L8.21341 1L4.32452 4.88889"
              stroke="#71717A"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.2135 1V10.3333"
              stroke="#71717A"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <button class="px-3 py-2 rounded bg-primary" @click="replyComment">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comment', 'showReplyButton', 'level'],
  data() {
    return {
      replyTextarea: false,
      dropDownOpen: false,
      editComment: false,
      commentBody: this.comment.body,
      modalOpen: false,
      replyText: '',
    }
  },
  computed: {
    canBeModified() {
      return this.$auth.loggedIn && this.comment.user_id === this.$auth.user.id
    },
  },
  methods: {
    async replyComment() {
      const comment = await this.$axios.$post(
        `/api/articles/${this.$route.params.articleSlug}/comments`,
        {
          body: this.replyText,
          parent_id: this.comment.id,
        }
      )
      const newComment = {
        ...comment,
        user: {
          id: this.$auth.user.id,
          name: this.$auth.user.name,
          profilePhoto: this.$auth.user.profilePhoto,
          username: this.$auth.user.username,
        },
      }
      this.$store.commit('comment/CREATE_COMMENT', {
        comment: newComment,
        level: this.level + 1,
      })
      this.replyText = ''
      this.replyTextarea = false
    },
    closeDropdown() {
      this.dropDownOpen = false
    },
    async deleteComment() {
      try {
        await this.$axios.$delete(
          `/api/articles/${this.$route.params.articleSlug}/comments/${this.comment.id}`
        )
        this.$store.commit('comment/DELETE_COMMENT', {
          comment: this.comment,
          level: this.level,
        })
        this.$toast.success('Successfully deleted')
      } catch (error) {
        this.$toast.error('Something went wrong')
      }
    },
    async updateComment() {
      await this.$axios.$patch(
        `/api/articles/${this.$route.params.articleSlug}/comments/${this.comment.id}`,
        { body: this.commentBody }
      )
      this.$store.commit('comment/UPDATE_COMMENT', {
        comment: { ...this.comment, body: this.commentBody },
        level: this.level,
      })
      this.editComment = false
    },
  },
}
</script>

<style lang="scss">
.comment-body-dropdown {
  @apply absolute right-3 w-24 bg-gray-100 rounded shadow-lg dark:bg-gray-700 top-full;
}
</style>
