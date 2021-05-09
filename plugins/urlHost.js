export default ({ app }, inject) => {
  // Inject $bn(number) in Vue, context and store.
  inject('urlHost', (fulllink) => {
    const url = new URL(fulllink)
    return url.host
  })
}
