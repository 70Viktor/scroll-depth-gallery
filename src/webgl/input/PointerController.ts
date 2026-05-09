import * as THREE from 'three'
import { config } from '../config'
import { roundTo } from '../utils'

export class PointerController {
  target = new THREE.Vector2()
  current = new THREE.Vector2()

  constructor() {
    window.addEventListener('pointermove', this.handlePointerMove)
    window.addEventListener('pointerout', this.handlePointerOut)
  }

  private handlePointerMove = (event: PointerEvent) => {
    const normalizedX = roundTo(event.clientX / window.innerWidth, 3)
    const normalizedY = roundTo(event.clientY / window.innerHeight, 3)

    this.target.x = normalizedX * 2 - 1
    this.target.y = -(normalizedY * 2 - 1)
  }

  private handlePointerOut = () => {
    this.target.x = 0
    this.target.y = 0
  }

  update() {
    const { smooth } = config.parallax

    this.current.x = roundTo(
      THREE.MathUtils.lerp(this.current.x, this.target.x, smooth),
      3,
    )
    this.current.y = roundTo(
      THREE.MathUtils.lerp(this.current.y, this.target.y, smooth),
      3,
    )
  }

  destroy() {
    window.removeEventListener('pointermove', this.handlePointerMove)
    window.removeEventListener('pointerout', this.handlePointerOut)
  }
}
