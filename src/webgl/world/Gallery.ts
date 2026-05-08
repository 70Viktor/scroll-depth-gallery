import { data } from '@data'
import type { Experience } from '@webgl'
import { inverseLerp } from 'three/src/math/MathUtils.js'
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
    const { gap } = config.gallery

    data.forEach((item, index) => {
      const options: GalleryItemOptions = {
        color: item.color,
        worldPosition: vector2To3(item.offset, -index * gap),
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
      // recycle
      while (item.resultZ > gallery.frontThreshold) {
        item.shiftRecycleCount(-1)
      }

      while (item.resultZ < gallery.backThreshold) {
        item.shiftRecycleCount(1)
      }

      // fade
      const distanceToCamera = Math.abs(camera.position.z - item.resultZ)
      const opacity = inverseLerp(fade.from, fade.to, distanceToCamera)
      item.setOpacity(opacity)

      item.update()
    })
  }

  destroy() {
    this.items.forEach((item) => {
      item.destroy()
    })

    this.items = []
  }
}
