<template>
  <div class="inline-block min-w-full overflow-hidden rounded-lg">
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th
            scope="col"
            class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
          >
            শিরোনাম
          </th>
          <th
            scope="col"
            class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
          >
            তৈরি করা হয়েছিল
          </th>
          <th
            scope="col"
            class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
          >
            status
          </th>
          <th
            scope="col"
            class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
          ></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p class="text-gray-900 whitespace-no-wrap">Admin</p>
          </td>
          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p class="text-gray-900 whitespace-no-wrap">12/09/2020</p>
          </td>
          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <span
              class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900"
            >
              <span
                aria-hidden="true"
                class="absolute inset-0 bg-green-200 rounded-full opacity-50"
              >
              </span>
              <span class="relative"> active </span>
            </span>
          </td>
          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <a href="#" class="text-indigo-600 hover:text-indigo-900"> Edit </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
}
</script>
