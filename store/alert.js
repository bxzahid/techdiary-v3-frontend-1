export const state = () => ({
  message: '',
  type: '', // error, success
})

export const mutations = {
  SUCCESS_ALERT(state, message) {
    state.message = message
    state.type = 'success'
  },
  ERROR_ALERT(state, message) {
    state.message = message
    state.type = 'error'
  },
  CLEAR(state) {
    state.message = ''
    state.type = ''
  },
}
