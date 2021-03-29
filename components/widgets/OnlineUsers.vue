<template>
  <div v-bind="$attrs">
    <h3 class="text-lg text-dark">অনলাইনে আছেন</h3>

    <div
      class='flex justify-between p-4 my-4 bg-yellow-100 border-2 border-yellow-200'
    >
      <div class='mr-4'>
        <p class='font-bold'>মোট লেখক</p>
        <p class='font-bold'>অনলাইন এ আছেন</p>
      </div>
      <div>
        <p>১৪৫</p>
        <p>{{ $store.state.onlineusers.users.length }}</p>
      </div>
    </div>

    <div class='flex flex-col mt-2'>
      <a href='#' class='flex items-center text-dark-secondary' v-for='user in $store.state.onlineusers.users'
         :key='user.username'>
        <span
          class='inline-block w-2 h-2 mr-2 bg-green-500 rounded-full'
        ></span>
        <span class='inline-block dark:text-gray-300'>{{ user.name }}</span>
      </a>
    </div>
  </div>
</template>
