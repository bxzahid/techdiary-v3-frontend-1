<template>
  <div>
    <slot name='top'></slot>

    <main class='wrapper'>
      <div class='grid grid-cols-12 md:space-x-5'>
        <section class='hidden col-span-12 md:block md:col-span-3'>
          <sidebar-left />
        </section>

        <div class='col-span-12 md:col-span-6'>
          <slot />
        </div>

        <section class='hidden col-span-12 md:block md:col-span-3'>
          <sidebar-right />
        </section>
      </div>

    </main>

    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'techdiary-body',
    },
  },
}
</script>
