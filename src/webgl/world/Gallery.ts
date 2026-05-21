import { data } from '@data'
import { type Size } from '@utils'
import type { Experience } from '@webgl'
import gsap from 'gsap'
import * as THREE from 'three'
import { Breath } from '../animations'
import { config } from '../config'
import { GalleryItem, type GalleryItemOptions } from './GalleryItem'

export class Gallery {
  private experience: Experience

  private items: GalleryItem[] = []
  activeIndex = 0

  private breath: Breath

  constructor(experience: Experience) {
    this.experience = experience

    this.create()

    this.breath = new Breath(this.experience)
  }

  private create() {
    const { startWorldZ, gap } = config.gallery

    data.forEach((item, index) => {
      const texture = this.experience.resources.getTexture(index)
      const aspect = texture.width / texture.height
      const size: Size = {
        width: item.width,
        height: item.width / aspect,
      }
      const { x, y } = item.offset
      const worldPosition = new THREE.Vector3(x, y, startWorldZ - index * gap)
      const introPosition = new THREE.Vector3(
        x * 0.7 * index,
        y * 0.7 * index,
        startWorldZ - index * gap * 0.3,
      )

      const options: GalleryItemOptions = {
        texture,
        size,
        worldPosition,
        introPosition,
      }
      const galleryItem = new GalleryItem(this.experience, options)

      this.items.push(galleryItem)
    })
  }

  intro(): GSAPTimeline {
    const tl = gsap.timeline()

    this.items.forEach((item) => {
      tl.add(item.intro(), 0)
    })

    return tl
  }

  update() {
    const { fade, render } = config
    const breathScale = this.breath.update()

    this.items.forEach((item) => {
      item.update()
      this.updateItemRecycle(item)

      const inRenderBand =
        item.resultZ > render.from && item.resultZ < render.to

      item.setVisible(inRenderBand)

      if (!inRenderBand) return

      const velocity = this.experience.scroll.normalizedVelocity
      item.setVelocity(velocity)

      const opacity =
        1 - THREE.MathUtils.inverseLerp(fade.from, fade.to, item.resultZ)
      item.setOpacity(opacity)

      item.setScale(breathScale)
    })

    this.updateActiveIndex()
  }

  private updateItemRecycle(item: GalleryItem) {
    const { gallery } = config

    while (item.resultZ > gallery.recycleToZ) {
      item.shiftRecycleCount(-1)
      item.update()
    }
    while (item.resultZ < gallery.recycleFromZ) {
      item.shiftRecycleCount(1)
      item.update()
    }
  }

  private updateActiveIndex() {
    const { itemActiveZ } = config.gallery

    let activeItem: GalleryItem | null = null

    for (const item of this.items) {
      if (item.resultZ >= itemActiveZ) {
        if (!activeItem || item.resultZ < activeItem.resultZ) {
          activeItem = item
        }
      }
    }

    if (!activeItem) return

    this.activeIndex = this.items.indexOf(activeItem)
  }

  destroy() {
    this.items.forEach((item) => {
      item.destroy()
    })

    this.items = []
  }
}
