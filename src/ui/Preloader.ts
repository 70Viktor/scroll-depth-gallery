import gsap from 'gsap'
import { throttle } from 'throttle-debounce'

export class Preloader {
  private root: HTMLElement
  private counter: HTMLElement
  private badge: HTMLElement
  private fill: HTMLElement
  private hole: SVGRectElement

  private warmupProgress: number
  private progressRef = { current: 0 }

  constructor() {
    const root = document.querySelector<HTMLElement>('.preloader')
    const counter = document.querySelector<HTMLElement>('.preloader__counter')
    const badge = document.querySelector<HTMLElement>('.preloader__badge')
    const fill = document.querySelector<HTMLElement>('.preloader__fill')
    const hole = document.querySelector<SVGRectElement>('.preloader__hole')

    const warmup = window.__preloaderWarmup

    if (!root || !counter || !badge || !fill || !hole || !warmup) {
      throw new Error('Preloader elements not found')
    }

    this.root = root
    this.counter = counter
    this.badge = badge
    this.fill = fill
    this.hole = hole

    warmup.stop()
    this.warmupProgress = warmup.progress
    this.progressRef.current = warmup.progress
  }

  setProgress = throttle(300, (value: number) => {
    const target = value + this.warmupProgress * (1 - value)

    gsap.to(this.progressRef, {
      current: target,
      duration: 0.3,
      ease: 'power3.out',
      onUpdate: () => {
        this.counter.textContent = (this.progressRef.current * 100).toFixed()
      },
    })

    gsap.to(this.fill, {
      scaleX: target,
      duration: 0.5,
      ease: 'power3.out',
    })
  })

  hide = (): GSAPTimeline => {
    const { width, height, x, y } = this.badge.getBoundingClientRect()
    const rx = parseFloat(window.getComputedStyle(this.badge).borderRadius)
    const scale = 4

    const tl = gsap.timeline({ onComplete: () => this.root.remove() })

    tl.set(this.hole, { width, height, x, y, rx })

    tl.to(this.badge, {
      opacity: 0,
      duration: 0.5,
      ease: 'none',
    })

    tl.to(
      this.badge,
      {
        scale,
        borderRadius: rx / scale,
        duration: 1,
        ease: 'power2.inOut',
      },
      0,
    )

    tl.to(
      this.hole,
      {
        width: width * scale,
        height: height * scale,
        x: x - (width * (scale - 1)) / 2,
        y: y - (height * (scale - 1)) / 2,
        duration: 1,
        ease: 'power2.inOut',
      },
      0,
    )

    tl.to(this.hole, {
      width: window.innerWidth + rx * 2,
      height: window.innerHeight + rx * 2,
      x: -rx,
      y: -rx,
      duration: 1,
      ease: 'expo.inOut',
    })

    return tl
  }
}
