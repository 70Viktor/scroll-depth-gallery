import gsap from 'gsap'

export class TitleItem {
  private mask: HTMLElement
  private el: HTMLElement

  private clip = {
    bottom: 100,
    top: 100,
  }

  private wasShow = false
  private wasHide = false

  private setClipPath: () => void

  constructor(title: string, root: HTMLElement) {
    const mask = document.createElement('span')
    const el = document.createElement('span')

    mask.className = 'title__item-mask'
    el.className = 'title__item'
    el.innerText = title

    this.mask = mask
    this.el = el

    this.mask.appendChild(this.el)
    root.appendChild(this.mask)

    const clipPathSetter = gsap.quickSetter(this.mask, 'clipPath')

    this.setClipPath = () => {
      clipPathSetter(
        `polygon(
                0% ${this.clip.top}%,
                100% ${this.clip.top}%,
                100% ${this.clip.bottom}%,
                0% ${this.clip.bottom}%
            )`,
      )
    }

    this.setClipPath()
  }

  show() {
    if (this.wasShow) return
    this.wasShow = true

    gsap.from(this.el, {
      yPercent: -50,
      duration: 0.6,
      ease: 'power1.out',
    })

    gsap.to(this.clip, {
      top: 0,
      duration: 0.6,
      ease: 'power1.out',
      onUpdate: () => this.setClipPath(),
    })
  }

  hide() {
    if (this.wasHide) return
    this.wasHide = true

    gsap.to(this.el, {
      opacity: 0,
      duration: 0.4,
      ease: 'none',
    })

    gsap.to(this.clip, {
      bottom: 0,
      duration: 0.6,
      ease: 'power1.out',
      onUpdate: () => this.setClipPath(),
      onComplete: () => {
        this.destroy()
      },
    })
  }

  private destroy() {
    this.mask.remove()
  }
}
