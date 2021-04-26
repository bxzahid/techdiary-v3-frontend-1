<template>
  <div>
    <slot name="top"></slot>

    <div class="wrapper">
      <div class="grid grid-cols-12 md:space-x-5">
        <div class="hidden col-span-12 md:block md:col-span-3">
          <sidebar-left />
        </div>

        <div class="col-span-12 md:col-span-6">
          <slot />
        </div>

        <div class="hidden col-span-12 md:block md:col-span-3">
          <sidebar-right />
        </div>
      </div>
    </div>

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
