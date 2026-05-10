import * as THREE from 'three'

const pixelRatio = () => Math.min(window.devicePixelRatio, 2)

type ResizeCallback = () => void

export class Sizes {
  size = new THREE.Vector2()
  pixelRatio: number

  get aspectRatio() {
    const { width, height } = this.size

    return width / height
  }

  private callbacks: ResizeCallback[] = []

  constructor() {
    this.size.set(window.innerWidth, window.innerHeight)
    this.pixelRatio = pixelRatio()

    window.addEventListener('resize', this.handleResize)
  }

  private handleResize = () => {
    this.size.set(window.innerWidth, window.innerHeight)
    this.pixelRatio = pixelRatio()

    this.callbacks.forEach((callback) => callback())
  }

  onResize(callback: ResizeCallback) {
    this.callbacks.push(callback)
  }

  destroy() {
    window.removeEventListener('resize', this.handleResize)
    this.callbacks = []
  }
}
