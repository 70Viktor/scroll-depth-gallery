import type { Experience } from '@webgl'
import * as THREE from 'three'
import { config } from '../config'
import { roundTo } from '../utils'

export class ScrollController {
  current = 0
  target = 0
  velocity = 0
  normalizedVelocity = 0
  direction: 1 | -1 = 1

  private experience: Experience

  constructor(experience: Experience) {
    this.experience = experience

    window.addEventListener('wheel', this.handleWheel, { passive: false })

    this.setupDebug()
  }

  private handleWheel = (event: WheelEvent) => {
    event.preventDefault()

    const { speed } = config.scroll

    const delta = event.deltaY * speed

    this.target = roundTo(this.target + delta, 3)
    this.direction = delta > 0 ? 1 : -1
  }

  private setupDebug() {
    if (!this.experience.debug.enabled) return

    const folder = this.experience.debug.gui!.addFolder('Scroll')

    folder.add(config.scroll, 'ease').min(0.01).max(1).step(0.01)
    folder.add(config.scroll, 'speed').min(0.01).max(1).step(0.01)
    folder.add(config.scroll, 'toWorldFactor').min(0.001).max(0.1).step(0.001)

    folder.add(this, 'current').listen()
    folder.add(this, 'target').listen()
    folder.add(this, 'velocity').listen()
    folder.add(this, 'direction').listen()
  }

  update() {
    const { ease, maxVelocity } = config.scroll
    const prev = this.current

    this.current = roundTo(
      THREE.MathUtils.lerp(this.current, this.target, ease),
      3,
    )

    this.velocity = THREE.MathUtils.clamp(
      roundTo(this.current - prev, 2),
      -maxVelocity,
      maxVelocity,
    )

    this.normalizedVelocity = roundTo(this.velocity / maxVelocity, 3)
  }

  destroy() {
    window.removeEventListener('wheel', this.handleWheel)
  }
}
