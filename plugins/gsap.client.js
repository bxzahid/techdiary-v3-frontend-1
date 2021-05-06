import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/scrollTrigger'

export default (_, inject) => {
  gsap.registerPlugin(ScrollTrigger)
  inject('gsap', gsap)
}
