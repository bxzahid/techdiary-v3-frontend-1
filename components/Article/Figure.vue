<template>
  <div>
    <figure
      :class="{
        'image--stretched': stretched,
        'image--normal': !stretched,
      }"
    >
      <div>{{ imageUrl }}</div>
      <figcaption>{{ caption }}</figcaption>
    </figure>
  </div>
</template>
<script>
export default {
  props: ['imageUrl', 'stretched', 'caption'],
  methods: {
    checkHost() {
      const url = new URL(this.imageUrl)
      return url.host
    },
    isCloudinary() {
      return this.checkHost() === 'res.cloudinary.com'
    },
    cloudinaryPublicId(url) {
      return url
      //   if (!this.isCloudinary)
      //     throw new Error('This is not a cloudinary image url')
      //   return url.split('/').slice(-2).join('/')
    },
  },
  computed: {
    getImageUrl() {
      return this.$cloudinary
    },
  },
}
</script>
