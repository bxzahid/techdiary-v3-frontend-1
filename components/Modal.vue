<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="fixed inset-0 z-10 overflow-y-auto"
    :class="{ visible: show, invisible: !show }"
  >
    <div
      class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
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
      <transition enter-active-class='ease-out duration-300' enter-class='opacity-0' enter-to-class='opacity-100'
                  leave-active-class='ease-in duration-200' leave-class='opacity-100' leave-to-class='opacity-0'>
        <div
          class='fixed inset-0 transition-opacity'
          aria-hidden='true'
          v-if='show'
          @click='clickAway'
        >
          <div class='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>
      </transition>
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <!--
        Modal panel, show/hide based on modal state.
        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <transition name="modal">
        <div
          class='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle max-w-md w-full'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
          v-if='show'
        >
          <div class='px-4 pt-5 pb-4 bg-white dark:bg-gray-800 sm:p-6 sm:pb-4'>
            <div>
              <div class='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <div class='mt-2'>
                  <p class='text-sm text-dark-secondary'>
                    <!--                    Are you sure you want to deactivate your account? All of your data will be permanently removed. This-->
                    <!--                    action cannot be undone.-->
                    <widgets-login />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!--          <div-->
          <!--            class="px-4 py-3 bg-gray-50 dark:bg-gray-700 sm:px-6 sm:flex sm:flex-row-reverse"-->
          <!--          >-->
          <!--            <slot name="buttons">-->
          <!--              <button-->
          <!--                type="button"-->
          <!--                @click="confirmed(true)"-->
          <!--                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"-->
          <!--              >-->
          <!--                হ্যাঁ-->
          <!--              </button>-->
          <!--              <button-->
          <!--                type="button"-->
          <!--                @click="confirmed(false)"-->
          <!--                class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"-->
          <!--              >-->
          <!--                একদমই না-->
          <!--              </button>-->
          <!--            </slot>-->
          <!--          </div>-->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['show'],
  methods: {
    clickAway() {
      this.$emit('close', false)
    },
    confirmed(isConfirmed = false) {
      this.$emit('close', isConfirmed)
    }
  }
}
</script>

<style lang="scss">
.modal {
  &-enter {
    @apply opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95;
    &-active {
      @apply ease-out duration-300;
    }
    &-to {
      @apply opacity-100 translate-y-0 sm:scale-100;
    }
  }
  //Leaving: "ease-in duration-200"
  //From: "opacity-100 translate-y-0 sm:scale-100"
  //To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  &-leave {
    @apply opacity-100 translate-y-0 sm:scale-100;
    &-active {
      @apply ease-in duration-200;
    }
    &-to {
      @apply opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95;
    }
  }
}
//Entering: "ease-out duration-300"
//From: "opacity-0"
//To: "opacity-100"
//Leaving: "ease-in duration-200"
//From: "opacity-100"
//To: "opacity-0"
.background-overlay {
  &-enter {
    @apply opacity-0;
    &-active {
      @apply ease-out duration-300;
    }
    &-to {
      @apply opacity-100;
    }
  }
  &-leave {
    @apply opacity-100;
    &-active {
      @apply ease-in duration-200;
    }
    &-to {
      @apply opacity-0;
    }
  }
}
</style>
