<template>
  <div
    class="flex flex-col items-center justify-center h-screen md:flex-row wrapper gap-x-16"
  >
    <div class="w-8/12 md:w-[350px]">
      <img src="~/static/images/sadface.gif" alt="techdiary-error" />
    </div>
    <pre class="col-auto text-sm md:text-xl">
{
    status: {{ error.statusCode }} , 
    message: '{{ error.message }}'
}
        </pre
    >
  </div>
</template>

<script>
export default {
  props: ['error'],
  head() {
    return {
      title: error.message,
    }
  },
}
</script>
