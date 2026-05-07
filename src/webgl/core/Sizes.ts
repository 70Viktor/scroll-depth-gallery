const pixelRatio = () => Math.min(window.devicePixelRatio, 2)

type ResizeCallback = () => void

export class Sizes {
  width: number
  height: number
  pixelRatio: number

  get aspectRatio() {
    return this.width / this.height
  }

  private callbacks: ResizeCallback[] = []

  constructor() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = pixelRatio()

    window.addEventListener('resize', this.handleResize)
  }

  private handleResize = () => {
    this.width = window.innerWidth
    this.height = window.innerHeight
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
