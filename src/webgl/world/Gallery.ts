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
    const { startWorld, gap } = config.gallery

    data.forEach((item, index) => {
      const texture = this.experience.resources.getTexture(index)
      const aspect = texture.width / texture.height
      const size: Size = {
        width: item.width,
        height: item.width / aspect,
      }
      const { x, y } = item.offset
      const worldPosition = new THREE.Vector3(x, y, startWorld - index * gap)
      const introPosition = new THREE.Vector3(
        x * 0.7 * index,
        y * 0.7 * index,
        startWorld - index * gap * 0.3,
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
    const { gallery, camera, fade } = config
    const scale = this.breath.update()

    this.items.forEach((item) => {
      item.update()

      // recycle
      while (item.resultZ > gallery.frontThreshold) {
        item.shiftRecycleCount(-1)
        item.update()
      }
      while (item.resultZ < gallery.backThreshold) {
        item.shiftRecycleCount(1)
        item.update()
      }

      // deformation
      const velocity = this.experience.scroll.normalizedVelocity
      item.setVelocity(velocity)

      // fade
      const distanceToCamera = Math.abs(camera.position.z - item.resultZ)
      const opacity =
        1 - THREE.MathUtils.inverseLerp(fade.from, fade.to, distanceToCamera)
      item.setOpacity(opacity)

      // breath
      item.setScale(scale)
    })

    this.updateActiveIndex()
  }

  private updateActiveIndex() {
    const { activeZ } = config.gallery

    let activeItem: GalleryItem | null = null

    for (const item of this.items) {
      if (item.resultZ >= activeZ) {
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
