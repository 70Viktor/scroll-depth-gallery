import { data } from '@data'
import { throttle } from 'throttle-debounce'
import { TitleItem } from './TitleItem'

export class Title {
  private root: HTMLElement

  private activeIndex = 0
  private activeItem: TitleItem

  constructor() {
    const root = document.querySelector<HTMLElement>('.title')

    if (!root) {
      throw new Error('Title root not found')
    }

    this.root = root

    const { title } = data[this.activeIndex]
    this.activeItem = new TitleItem(title, this.root)
    this.activeItem.show()
  }

  setActiveIndex = throttle(250, (newIndex: number) => {
    if (this.activeIndex === newIndex) return
    this.activeIndex = newIndex

    this.activeItem.hide()
    const { title } = data[newIndex]
    this.activeItem = new TitleItem(title, this.root)
    this.activeItem.show()
  })
}
