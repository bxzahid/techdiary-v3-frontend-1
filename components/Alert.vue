<template>
  <transition
    name="alert"
    mode="out-in"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
    v-on:before-enter="beforeEnter"
  >
    <div
      v-if="message"
      :class="{
        'bg-red-600': type === 'error',
        'bg-green-600': type === 'success',
      }"
      class="z-50 alert"
    >
      <p class="ml-2 text-white alert__message" v-html="message"></p>
      <button
        class="pl-2 ml-auto mr-2 focus:outline-none"
        @click="$store.commit('alert/CLEAR')"
      >
        &times;
      </button>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'lodash.debounce'
import anime from 'animejs'

export default {
  name: 'alert',
  computed: mapState('alert', ['message', 'type']),
  watch: {
    message: {
      immediate: true,
      handler: debounce(function (value) {
        if (value) {
          this.$store.commit('alert/CLEAR')
        }
      }, 7000),
    },
  },
  methods: {
    getTranslateValue(el) {
      const transformStyle = window
        .getComputedStyle(el)
        .getPropertyValue('transform')
      const matrix = new DOMMatrix(transformStyle)
      const translateX = matrix.m41
      return { translateX }
    },
    numberToPxString(number) {
      return `${number}px`
    },
    beforeEnter(el) {
      const media = window.matchMedia('(min-width: 640px)')
      el.style.opacity = 0
      if (media.matches) el.style.transform = 'translateX(-50%)'
    },
    enter(el, done) {
      const { translateX } = this.getTranslateValue(el)
      if (this.type === 'success') {
        anime({
          targets: el,
          translateY: [-100, 0],
          translateX: [
            this.numberToPxString(translateX),
            this.numberToPxString(translateX),
          ],
          duration: 500,
          opacity: 1,
          easing: 'easeOutBounce',
          complete: (anim) => {
            done()
            if (anim.completed) el.removeAttribute('style')
          },
        })
      } else {
        anime({
          targets: el,
          duration: 500,
          keyframes: [
            { translateY: -100, opacity: 0 },
            { translateY: 0, opacity: 1 },
            { translateX: this.numberToPxString(translateX + 8) },
            { translateX: this.numberToPxString(translateX - 8) },
            { translateX: this.numberToPxString(translateX + 4) },
            { translateX: this.numberToPxString(translateX - 4) },
            { translateX: this.numberToPxString(translateX) },
          ],
          easing: 'easeOutSine',
          complete: (anim) => {
            done()
            if (anim.completed) el.removeAttribute('style')
          },
        })
      }
    },
    leave(el, done) {
      const { translateX } = this.getTranslateValue(el)
      anime({
        targets: el,
        duration: 500,
        translateY: -100,
        translateX: [
          this.numberToPxString(translateX),
          this.numberToPxString(translateX),
        ],
        complete: done,
        easing: 'easeInOutQuad',
      })
    },
  },
}
</script>

<style lang="scss">
.alert {
  min-width: 288px;
  @apply text-white fixed top-2 sm:transform translate-y-1 sm:-translate-x-1/2 right-8 left-8 sm:right-auto sm:left-1/2 flex-wrap justify-center flex items-center py-2 px-1 rounded;
  &__message {
    a {
      @apply underline;
    }
  }
}
</style>
