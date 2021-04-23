<template>
  <div class="mx-auto md:w-8/12">
    <div>
      <!-- thumbnail -->
      <PuSkeleton height="350px" />
    </div>
    <PuSkeleton />
    <div class="my-4">
      <div class="mb-5">
        <PuSkeleton circle height="35px" width="35px" />
        <PuSkeleton width="200px" height="35px" />
      </div>

      <!-- body -->
      <PuSkeleton count="10" height="10px" />
    </div>
  </div>
</template>
