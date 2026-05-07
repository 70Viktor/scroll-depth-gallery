type TickCallback = () => void

export class Time {
  start: number
  current: number
  elapsed: number
  delta: number

  private callbacks: TickCallback[] = []
  private rafId: number | null = null

  constructor() {
    this.start = performance.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16

    this.tick()
  }

  private tick = () => {
    const now = performance.now()

    this.delta = now - this.current
    this.current = now
    this.elapsed = this.current - this.start

    this.callbacks.forEach((callback) => callback())

    this.rafId = window.requestAnimationFrame(this.tick)
  }

  onTick(callback: TickCallback) {
    this.callbacks.push(callback)
  }

  destroy() {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId)
    }

    this.callbacks = []
  }
}
