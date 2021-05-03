<template>
  <div v-bind="$attrs">
    <h3 class="text-lg font-light text-dark">নির্বাচিত ট্যাগ সমূহ</h3>
    <div class="mt-2 tags">
      <div class="tag" v-for="tag in tags" :key="tag.label" :title="tag.label">
        <nuxt-link
          :to="{ name: 'tags-name', params: { name: tag.label } }"
          class="tag__link"
        >
          <img class="tag__icon" :src="tag.icon" :alt="tag.label" />
          <span class="tag__label"># {{ tag.label }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    tags: [
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873446/static-assets/tag-icons/nodejs.svg',
        label: 'nodejs',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873448/static-assets/tag-icons/typescript.svg',
        label: 'ts',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873444/static-assets/tag-icons/js.svg',
        label: 'js',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873444/static-assets/tag-icons/java.svg',
        label: 'java',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873446/static-assets/tag-icons/python.svg',
        label: 'python',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1620056845/static-assets/tag-icons/dart.svg',
        label: 'dart',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873442/static-assets/tag-icons/go.svg',
        label: 'go',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873446/static-assets/tag-icons/php.svg',
        label: 'php',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873446/static-assets/tag-icons/ruby.svg',
        label: 'ruby',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873443/static-assets/tag-icons/html.svg',
        label: 'html',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873440/static-assets/tag-icons/css.svg',
        label: 'css',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873444/static-assets/tag-icons/laravel.svg',
        label: 'laravel',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873442/static-assets/tag-icons/graphql.svg',
        label: 'graphql',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1620055377/static-assets/tag-icons/react.svg',
        label: 'react',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873448/static-assets/tag-icons/vue.svg',
        label: 'vue',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1620055921/static-assets/tag-icons/svelte.svg',
        label: 'svelte',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1620054922/static-assets/tag-icons/angular.svg',
        label: 'angular',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873442/static-assets/tag-icons/flutter.svg',
        label: 'flutter',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873444/static-assets/tag-icons/kubernetes.svg',
        label: 'kubernetes',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873442/static-assets/tag-icons/docker.svg',
        label: 'docker',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873440/static-assets/tag-icons/aws.svg',
        label: 'aws',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873442/static-assets/tag-icons/git.svg',
        label: 'git',
      },
      {
        icon:
          'https://res.cloudinary.com/techdiary-dev/image/upload/v1616873442/static-assets/tag-icons/github.svg',
        label: 'github',
      },
    ],
  }),
}
</script>

<style scoped lang="scss">
.tags {
  @apply flex flex-col space-y-2;
}
.tag {
  &__link {
    @apply flex space-x-2 items-center mb-2 dark:text-gray-50;
  }
  &__icon {
    @apply w-8;
  }
}
</style>
