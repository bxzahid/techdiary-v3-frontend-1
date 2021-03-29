import bnnum from 'bnnum'

export default ({ app }, inject) => {
  // Inject $bn(number) in Vue, context and store.
  inject('bn', value => bnnum(value))
}