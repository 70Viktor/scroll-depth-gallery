import { Experience } from '@webgl'
import './style.css'

const canvas = document.querySelector<HTMLCanvasElement>('#experience')

const experience = new Experience(canvas!)

window.addEventListener('beforeunload', () => {
  experience.destroy()
})
