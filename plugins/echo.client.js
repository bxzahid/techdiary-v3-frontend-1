import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')
export default ({ app }, inject) => {
  window.Pusher = require('pusher-js')
  Pusher.logToConsole = true
  const echo = new Echo({
    broadcaster: 'pusher',
    // key: process.env.MIX_PUSHER_APP_KEY,
    key: 'ecd078d7fb446d6271df',
    cluster: 'ap2',
    forceTLS: true,
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          app.$axios.post('/broadcasting/auth', {
            socket_id: socketId,
            channel_name: channel.name
          })
            .then(response => {
              callback(false, response.data)
            })
            .catch(error => {
              console.log(error)
              callback(true, error)
            })
        }
      }
    }
  })
  inject('echo', echo)
}
