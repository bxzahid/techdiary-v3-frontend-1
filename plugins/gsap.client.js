import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default (_, inject) => {
  gsap.registerPlugin(ScrollTrigger)
  inject('gsap', gsap)
}
