import gsap from 'gsap'

export class TgLink {
  private el: HTMLElement
  private defaultText: string
  private hoverText = 'Telegram Link'

  constructor() {
    const el = document.querySelector<HTMLElement>('.tg-link')

    if (!el) {
      throw new Error('tg-link not found')
    }

    this.el = el
    this.defaultText = el.textContent

    this.el.addEventListener('mouseenter', this.handleMouseEnter)
    this.el.addEventListener('mouseleave', this.handleMouseLeave)
  }

  private handleMouseEnter = () => {
    gsap.to(this.el, {
      overwrite: true,
      duration: 0.3,
      ease: 'power1.inOut',
      scrambleText: {
        text: this.hoverText,
        chars: '01',
      },
    })
  }

  private handleMouseLeave = () => {
    gsap.to(this.el, {
      overwrite: true,
      duration: 0.3,
      ease: 'power1.inOut',
      scrambleText: {
        text: this.defaultText,
        chars: '01',
      },
    })
  }

  destroy() {
    this.el.removeEventListener('mouseenter', this.handleMouseEnter)
    this.el.removeEventListener('mouseleave', this.handleMouseLeave)
  }
}
