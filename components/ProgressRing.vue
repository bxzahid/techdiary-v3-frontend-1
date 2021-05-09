<template>
  <svg
    :height='radius * 2'
    :width='radius * 2'
    class='transition-all duration-200'
    :class='progress >= 100? "text-green-500": progress >= 50 ? "text-primary": "text-yellow-500"'
  >
    <circle
      stroke='currentColor'
      :stroke-dasharray='`${this.circumference} ${this.circumference}`'
      :style='{strokeDashoffset:this.offset}'
      :stroke-width='stroke'
      fill='transparent'
      :r='normalizedRadius'
      :cx='radius'
      :cy='radius'
    />
  </svg>
</template>

<script>

export default {
  props: ['stroke', 'radius', 'progress'],
  computed: {
    normalizedRadius() {
      return this.radius - this.stroke * 2
    },
    circumference() {
      return this.normalizedRadius * 2 * Math.PI
    },
    offset() {
      return this.circumference - ((this.progress < 0 ? 0 : this.progress > 100 ? 100 : this.progress) / 100 * this.circumference)
    }
  }
}
</script>

<style scoped>
circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>
