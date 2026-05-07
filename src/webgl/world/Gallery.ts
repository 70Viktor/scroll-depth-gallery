import { data } from '@data'
import type { Experience } from '@webgl'
import { vector2To3 } from '../utils'
import { GalleryItem, type GalleryItemOptions } from './GalleryItem'

const gap = 5

export class Gallery {
  private experience: Experience

  private items: GalleryItem[] = []

  constructor(experience: Experience) {
    this.experience = experience

    this.create()
  }

  private create() {
    data.forEach((item, index) => {
      const options: GalleryItemOptions = {
        color: item.color,
        position: vector2To3(item.offset, -index * gap),
      }

      const galleryItem = new GalleryItem(this.experience, options)

      this.items.push(galleryItem)
    })
  }

  destroy() {
    this.items.forEach((item) => {
      item.destroy()
    })

    this.items = []
  }
}
