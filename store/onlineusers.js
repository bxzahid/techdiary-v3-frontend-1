export const state = () => ({
  users: [],
})

export const mutations = {
  SET_USERS(state, payload) {
    state.users = payload
  },
  ADD_USER(state, payload) {
    state.users.push(payload)
  },
  REMOVE_USER(state, payload) {
    state.users = state.users.filter(
      (user) => user.username !== payload.username
    )
  },
}
