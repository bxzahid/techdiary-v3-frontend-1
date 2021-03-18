export default {
  methods: {
    uploadFile(file, preset) {
      return new Promise(async (resolve) => {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('upload_preset', preset)

        // TODO: handle exception
        const fetchApi = await fetch(
          'https://api.cloudinary.com/v1_1/techdiary-dev/image/upload',
          {
            method: 'POST',
            body: fd,
          }
        )
        const res = await fetchApi.json()

        resolve(res.secure_url)
      })
    },
  },
}
