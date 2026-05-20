import * as THREE from 'three'
import { config } from '../config'

export class ScrollController {
  current = 0
  target = 0
  touchY = 0
  direction: 1 | -1 = 1

  velocityRaw = 0
  velocity = 0
  normalizedVelocity = 0

  hasScrolled = false
  enabled = false

  constructor() {
    window.addEventListener('wheel', this.handleWheel, { passive: false })
    window.addEventListener('pointerdown', this.handlePointerDown, {
      passive: false,
    })
    window.addEventListener('pointermove', this.handlePointerMove, {
      passive: false,
    })
  }

  private handleWheel = (event: WheelEvent) => {
    event.preventDefault()

    if (!this.enabled) return

    const { wheelSpeed } = config.scroll

    this.addScrollDelta(event.deltaY * wheelSpeed)
  }

  private handlePointerDown = (event: PointerEvent) => {
    if (!this.enabled) return
    if (event.pointerType === 'mouse') return

    this.touchY = event.clientY
  }

  private handlePointerMove = (event: PointerEvent) => {
    event.preventDefault()

    if (!this.enabled) return
    if (event.pointerType === 'mouse') return

    const { touchSpeed } = config.scroll

    const deltaY = this.touchY - event.clientY
    this.touchY = event.clientY

    this.addScrollDelta(deltaY * touchSpeed)
  }

  private addScrollDelta(deltaY: number) {
    if (!this.hasScrolled) this.hasScrolled = true

    this.target += deltaY
    this.direction = deltaY > 0 ? 1 : -1
  }

  enable() {
    this.enabled = true
  }

  update() {
    const { smooth, maxVelocity, velocitySmooth } = config.scroll
    const prevScroll = this.current

    this.current = THREE.MathUtils.lerp(this.current, this.target, smooth)

    this.velocityRaw = this.current - prevScroll
    this.velocity = THREE.MathUtils.lerp(
      this.velocity,
      this.velocityRaw,
      velocitySmooth,
    )

    this.velocity = THREE.MathUtils.clamp(
      this.velocity,
      -maxVelocity,
      maxVelocity,
    )

    this.normalizedVelocity = this.velocity / maxVelocity
  }

  destroy() {
    window.removeEventListener('wheel', this.handleWheel)
    window.removeEventListener('pointerdown', this.handlePointerDown)
    window.removeEventListener('pointermove', this.handlePointerMove)
  }
}
