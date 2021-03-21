<template>
  <main>
    <Navbar />
    <div class="wrapper">
      <div class="dashboard">
        <div class="dashboard__sidebar">
          <DashboardSidebar />
        </div>
        <div class="dashboard__main">
          <slot name="title"></slot>
          <Nuxt />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  head: {
    title: 'Dashboard',
    bodyAttrs: {
      class: 'bg-gray-200 dark:bg-gray-900',
    },
  },
  middleware: 'auth',
}
</script>

<style lang="scss" scoped>
.dashboard {
  @apply grid h-auto md:min-h-screen grid-cols-12 bg-white rounded shadow dark:bg-gray-800;
  &__sidebar {
    @apply col-span-2 border-b md:border-r md:border-b-0 dark:border-gray-700 p-3;
  }
  &__main {
    @apply h-full col-span-10 p-4;
  }
}
</style>
