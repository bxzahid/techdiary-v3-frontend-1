<template>
  <cld-image
    :public-id="cloudinaryPublicId()"
    v-bind="$attrs"
    v-if="isCloudinary()"
  >
    <cld-placeholder type="vectorize" />
  </cld-image>

  <img v-else :src="imageUrl" alt="alt" v-bind="$attrs" />
</template>
<script>
export default {
  props: ['imageUrl', 'alt'],
  methods: {
    checkHost() {
      const url = new URL(this.imageUrl)
      return url.host
    },
    isCloudinary() {
      return this.checkHost() === 'res.cloudinary.com'
    },
    cloudinaryPublicId() {
      if (!this.isCloudinary)
        throw new Error('This is not a cloudinary image url')
      return this.imageUrl.split('/').slice(-2).join('/')
    },
  },
}
</script>
