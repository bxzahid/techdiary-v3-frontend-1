<template>
  <main>
    <Navbar />
    <div class="wrapper">
      <div
        class="grid min-h-[85vh] grid-cols-12 bg-white rounded shadow dark:bg-gray-800"
      >
        <div
          class="col-span-12 p-3 border-b md:col-span-2 md:border-r md:border-b-0 dark:border-gray-700"
        >
          <DashboardSidebar />
        </div>
        <div class="col-span-12 p-4 md:col-span-10">
          <slot name="title"></slot>
          <Nuxt />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: 'Dashboard',
      bodyAttrs: {
        class: 'bg-gray-200 dark:bg-gray-900 font-techdiary'
      }
    }
  },
  middleware: 'auth'
}
</script>
