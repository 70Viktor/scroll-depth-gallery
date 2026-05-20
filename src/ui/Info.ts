import { data } from '@data'
import gsap from 'gsap'

export class Info {
  title: HTMLElement
  year: HTMLElement

  constructor(initialIndex: number) {
    const titleEl = document.querySelector<HTMLElement>('.info__title')
    const yearEl = document.querySelector<HTMLElement>('.info__year')
    const { title, year } = data[initialIndex]

    if (!titleEl || !yearEl) {
      throw new Error('Element not found')
    }

    titleEl.textContent = title
    yearEl.textContent = String(year)

    this.title = titleEl
    this.year = yearEl
  }

  updateIndex(index: number): GSAPTimeline {
    const { title, year } = data[index]
    const tl = gsap.timeline({ defaults: { duration: 0.2 } })

    tl.to(this.year, {
      duration: 0.4,
      scrambleText: {
        text: String(year),
        chars: '0123456789',
      },
    })
    tl.to(
      this.title,
      {
        duration: 0.4,
        scrambleText: {
          text: title,
          chars: title.replace(/[^а-я]/g, ''),
        },
      },
      '<+0.2',
    )

    return tl
  }
}
