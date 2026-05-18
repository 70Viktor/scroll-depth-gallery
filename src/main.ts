import { Experience } from '@webgl'
import gsap from 'gsap'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
import './style.css'

gsap.registerPlugin(ScrambleTextPlugin)

const canvas = document.querySelector<HTMLCanvasElement>('#experience')

const experience = new Experience(canvas!)

window.addEventListener('beforeunload', () => {
  experience.destroy()
})
