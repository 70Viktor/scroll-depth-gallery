import { roundTo } from '@utils'
import * as THREE from 'three'
import { config } from '../config'

export class ScrollController {
  current = 0
  target = 0
  velocity = 0
  normalizedVelocity = 0
  direction: 1 | -1 = 1
  hasScrolled = false
  enabled = false

  constructor() {
    window.addEventListener('wheel', this.handleWheel, { passive: false })
  }

  private handleWheel = (event: WheelEvent) => {
    event.preventDefault()

    if (!this.enabled) return

    const { speed } = config.scroll

    if (!this.hasScrolled) this.hasScrolled = true

    const delta = event.deltaY * speed

    this.target = roundTo(this.target + delta, 3)
    this.direction = delta > 0 ? 1 : -1
  }

  enable() {
    this.enabled = true
  }

  update() {
    const { smooth, maxVelocity } = config.scroll
    const prev = this.current

    this.current = roundTo(
      THREE.MathUtils.lerp(this.current, this.target, smooth),
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
