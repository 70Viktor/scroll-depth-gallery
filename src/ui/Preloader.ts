import type { Experience } from '@webgl'
import gsap from 'gsap'
import { throttle } from 'throttle-debounce'

export class Preloader {
  private root: HTMLElement
  private counter: HTMLElement
  private columns: HTMLElement[] = []

  private progress = { value: 0 }

  constructor({ sizes }: Experience) {
    const root = document.querySelector<HTMLElement>('.preloader')
    const columnsRoot = document.querySelector<HTMLElement>(
      '.preloader__columns',
    )
    const counter = document.querySelector<HTMLElement>('.preloader__counter')

    if (!root || !columnsRoot || !counter) {
      throw new Error('Preloader elements not found')
    }

    this.root = root
    this.counter = counter

    const count = Math.round(sizes.size.x / sizes.pixelRatio / 175)

    this.columns = Array.from({ length: count }).map(() => {
      const column = document.createElement('div')
      column.className = 'preloader__column'

      columnsRoot.appendChild(column)

      return column
    })
  }

  setProgress = throttle(300, (value: number) => {
    const onUpdate = () => {
      this.counter.textContent = String(Math.round(this.progress.value * 100))
    }

    gsap.to(this.progress, {
      value,
      duration: 0.3,
      ease: 'power3.out',
      onUpdate,
    })
  })

  hide = () => {
    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => this.root.remove(),
    })

    tl.set(this.root, {
      background: 'rgba(0, 0, 0, 0)',
      cursor: 'default',
    })

    tl.to(this.counter, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'none',
    })
    tl.to(
      this.columns,
      {
        clipPath: 'inset(0% 0% 0% 100%)',
        duration: 0.7,
        ease: 'power2.inOut',
        stagger: 0.03,
      },
      '<',
    )
  }
}
