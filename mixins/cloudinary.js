export default {
  methods: {
    socialMediaImage(title, author) {
      return `https://res.cloudinary.com/techdiary-dev/image/upload/l_text:Arial_45_bold:${title},g_north_west,x_30,y_30/l_text:Arial_25:${author},g_south_west,x_30,y_30/static-assets/social%20media/crtjcvtfzbugcwrdoedm.jpg`
    },
  },
  checkHost() {
    const url = new URL(this.imageUrl)
    return url.host
  },
  isCloudinary() {
    return this.checkHost() === 'res.cloudinary.com'
  },
}
