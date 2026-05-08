import { data } from '@data'
import type { Experience } from '@webgl'
import * as THREE from 'three'
import { config } from '../config'
import { vector2To3 } from '../utils'
import { GalleryItem, type GalleryItemOptions } from './GalleryItem'

export class Gallery {
  private experience: Experience

  private items: GalleryItem[] = []

  constructor(experience: Experience) {
    this.experience = experience

    this.create()
    this.setupDebug()
  }

  private create() {
    const { gap, startWorld } = config.gallery

    data.forEach((item, index) => {
      const options: GalleryItemOptions = {
        color: item.color,
        bgColor: item.bgColor,
        worldPosition: vector2To3(item.offset, startWorld - index * gap),
      }

      const galleryItem = new GalleryItem(this.experience, options)

      this.items.push(galleryItem)
    })
  }

  private setupDebug() {
    if (!this.experience.debug.enabled) return

    const folder = this.experience.debug.gui!.addFolder('Gallery')

    folder
      .add(config.gallery, 'gap')
      .min(0.1)
      .max(10)
      .step(0.1)
      .onChange(() => this.updateLayout())
    folder.add(config.gallery, 'recycleThreshold').min(0.1).max(10).step(0.1)

    folder.add(config.gallery, 'totalDepth').listen()
  }

  updateLayout() {
    const { gap } = config.gallery

    this.items.forEach((item, index) => {
      item.updateWorldPositionZ(-index * gap)
    })
    this.update()
  }

  update() {
    const { gallery, camera, fade } = config

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

      // bg color
      this.updateBgColor()
    })
  }

  private updateBgColor(): void {
    const { startWorld } = config.gallery
    let currentItem: GalleryItem | null = null
    let nextItem: GalleryItem | null = null

    for (const item of this.items) {
      if (item.resultZ >= startWorld) {
        if (!currentItem || item.resultZ < currentItem.resultZ) {
          currentItem = item
        }
      }

      if (item.resultZ < startWorld) {
        if (!nextItem || item.resultZ > nextItem.resultZ) {
          nextItem = item
        }
      }
    }

    if (!currentItem || !nextItem) return

    const progress = THREE.MathUtils.inverseLerp(
      currentItem.resultZ,
      nextItem.resultZ,
      startWorld,
    )
    const bgColor = currentItem.bgColor.clone().lerp(nextItem.bgColor, progress)

    this.experience.scene.background = bgColor
  }

  destroy() {
    this.items.forEach((item) => {
      item.destroy()
    })

    this.items = []
  }
}
