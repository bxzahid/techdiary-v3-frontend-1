<template></template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'dashboard',
  asyncData({ redirect }) {
    return redirect('/dashboard/diaries')
  },
})
</script>
