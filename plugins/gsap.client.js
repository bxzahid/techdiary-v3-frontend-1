import gsap from 'gsap'
import scrollTrigger from 'gsap/scrollTrigger'

export default (_, inject) => {
  gsap.registerPlugin(scrollTrigger)
  inject('gsap', gsap)
}
