import gsap from 'gsap'
import { ColorControl } from './ColorControl'
import { Info } from './Info'
import { TgLink } from './TgLink'

export class UI {
  private activeIndex = 0
  private artist: HTMLElement
  private info: Info
  private developer: HTMLElement
  private tgLink: TgLink
  private color: ColorControl

  constructor() {
    const artist = document.querySelector<HTMLElement>('.artist')
    const developer = document.querySelector<HTMLElement>('.developer')

    if (!artist || !developer) {
      throw new Error('ui elements not found')
    }

    this.artist = artist
    this.developer = developer
    this.info = new Info(this.activeIndex)
    this.tgLink = new TgLink()
    this.color = new ColorControl(this.activeIndex)
    this.initialHide()
  }

  private initialHide() {
    const { year, title } = this.info

    gsap.set([year, title], {
      x: 80,
      opacity: 0,
    })

    gsap.set([this.artist, this.developer], {
      x: -80,
      opacity: 0,
    })
  }

  intro(): GSAPTimeline {
    const tl = gsap.timeline()
    const { year, title } = this.info

    tl.to([this.artist, year, title, this.developer], {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'expo.inOut',
      stagger: 0.03,
    })

    return tl
  }

  setActiveIndex(index: number) {
    if (this.activeIndex === index) return
    this.activeIndex = index

    this.info.updateIndex(index)
    this.color.updateIndex(index)
  }

  destroy() {
    this.tgLink.destroy()
  }
}
