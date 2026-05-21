import * as THREE from 'three'

export class SmoothColor {
  private current: THREE.Color
  private target: THREE.Color
  private smooth: number

  constructor(color: THREE.ColorRepresentation, smooth: number) {
    this.current = new THREE.Color(color)
    this.target = new THREE.Color(color)
    this.smooth = smooth
  }

  set value(value: THREE.ColorRepresentation) {
    this.target.set(value)
  }

  get value() {
    return this.current
  }

  jump(value: THREE.Color) {
    this.target.copy(value)
    this.current.copy(value)
  }

  update(): THREE.Color {
    this.current.lerp(this.target, this.smooth)

    return this.current
  }
}
