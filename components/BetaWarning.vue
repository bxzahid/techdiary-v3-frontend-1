<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full bg-yellow-400"
    v-if="!warningSeen"
  >
    <div class="px-3 py-1 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex items-center flex-1 w-0">
          <span class="flex p-2 bg-yellow-600 rounded-lg">
            <!-- Heroicon name: outline/speakerphone -->

            <svg
              class="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </span>
          <p class="ml-3 text-gray-800">
            টেকডায়েরির এই ভার্সনটি এখনো নির্মানাধিন। যদি কোন বাগ পেয়ে থাকেন দয়া
            করে গিটহাবে ইস্যু তৈরি করে জানিয়ে দিন।
          </p>
        </div>
        <div
          class="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto"
        >
          <a
            href="https://github.com/techdiary-dev/Techdiary/issues/new/choose"
            class="flex items-center justify-center px-4 py-2 space-x-2 text-sm font-medium bg-white border border-transparent rounded-md shadow-sm hover:bg-indigo-50"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M304 280h416c4.4 0 8-3.6 8-8 0-40-8.8-76.7-25.9-108.1-17.2-31.5-42.5-56.8-74-74C596.7 72.8 560 64 520 64h-16c-40 0-76.7 8.8-108.1 25.9-31.5 17.2-56.8 42.5-74 74C304.8 195.3 296 232 296 272c0 4.4 3.6 8 8 8z"
              ></path>
              <path
                d="M940 512H792V412c76.8 0 139-62.2 139-139 0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 34.8-28.2 63-63 63H232c-34.8 0-63-28.2-63-63 0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 76.8 62.2 139 139 139v100H84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h148v96c0 6.5.2 13 .7 19.3C164.1 728.6 116 796.7 116 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-44.2 23.9-82.9 59.6-103.7 6 17.2 13.6 33.6 22.7 49 24.3 41.5 59 76.2 100.5 100.5 28.9 16.9 61 28.8 95.3 34.5 4.4 0 8-3.6 8-8V484c0-4.4 3.6-8 8-8h60c4.4 0 8 3.6 8 8v464.2c0 4.4 3.6 8 8 8 34.3-5.7 66.4-17.6 95.3-34.5 41.5-24.3 76.2-59 100.5-100.5 9.1-15.5 16.7-31.9 22.7-49C812.1 793.1 836 831.8 836 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-79.3-48.1-147.4-116.7-176.7.4-6.4.7-12.8.7-19.3v-96h148c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
              ></path>
            </svg>
            <span>ইস্যু জমা দিন।</span>
          </a>
        </div>
        <div class="flex-shrink-0 order-2 sm:order-3 sm:ml-3">
          <button
            type="button"
            @click="warningSeen = true"
            class="flex p-2 -mr-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
          >
            <span class="sr-only">Dismiss</span>
            <!-- Heroicon name: outline/x -->
            <svg
              class="w-6 h-6 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    if (localStorage.warningSeen) {
      this.warningSeen = localStorage.warningSeen
    }
  },
  data() {
    return {
      warningSeen: false,
    }
  },
  watch: {
    warningSeen(value) {
      localStorage.warningSeen = value
    },
  },
}
</script>
