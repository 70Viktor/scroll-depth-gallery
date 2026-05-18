import { data } from '@data'
import gsap from 'gsap'
import { getColorLuminance } from '../utils'

export class GalleryInfo {
  private activeIndex = -1

  private title: HTMLElement
  private year: HTMLElement

  constructor() {
    const title = document.querySelector<HTMLElement>('.info__title')
    const year = document.querySelector<HTMLElement>('.info__year')

    if (!title || !year) {
      throw new Error('Element not found')
    }

    this.title = title
    this.year = year
  }

  setActiveIndex(index: number) {
    if (this.activeIndex === index) return
    this.activeIndex = index

    const { title, year, bgColor } = data[index]

    const luminance = getColorLuminance(bgColor)

    gsap.to('html', {
      '--text-color': luminance > 0.5 ? '#000000' : '#FFFFFF',
      duration: 0.3,
      ease: 'none',
    })

    gsap.to(this.title, {
      duration: 0.4,
      scrambleText: {
        text: title,
        revealDelay: 0.2,
        chars: title.replace(/[^а-я]/g, ''),
      },
    })

    gsap.to(this.year, {
      duration: 0.2,
      scrambleText: {
        text: String(year),
        chars: '0123456789',
      },
    })
  }
}
