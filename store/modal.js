export const state = () => ({
  heading: '',
  content: '',
  show: false,
  confirmed: false,
})

export const mutations = {
  WARNING_MODAL(state, { heading, content }) {
    state.show = true
    state.heading = heading
    state.content = content
  },
  CONFIRM_STATE(state, isconfirmed) {
    state.confirmed = isconfirmed
  },
  HIDE(state) {
    state.heading = ''
    state.content = ''
    state.show = false
  },
}

export const actions = {
  triggierModal({ state, commit }) {
    return new Promise((resolve, reject) => {
      commit('WARNING_MODAL', {
        heading: 'Sure to delete?',
        content: 'deleted content can not be undone',
      })
    })
  },
}
