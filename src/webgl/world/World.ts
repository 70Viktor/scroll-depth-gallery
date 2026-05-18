import * as THREE from 'three'
import type { Experience } from '../Experience'
import { Background } from './Background'
import { Environment } from './Environment'
import { Gallery } from './Gallery'
import { GalleryInfo } from './GalleryInfo'

export class World {
  private experience: Experience
  private environment: Environment
  private background: Background
  private gallery: Gallery
  private info: GalleryInfo

  private axesHelper: THREE.AxesHelper
  private gridHelper: THREE.GridHelper

  constructor(experience: Experience) {
    this.experience = experience

    this.environment = new Environment(this.experience)
    this.background = new Background(this.experience)
    this.gallery = new Gallery(this.experience)
    this.info = new GalleryInfo()

    this.axesHelper = new THREE.AxesHelper(5)
    this.gridHelper = new THREE.GridHelper(20, 20)

    this.experience.scene.add(this.axesHelper, this.gridHelper)
  }

  resize() {
    this.background.resize()
  }

  update() {
    this.gallery.update()

    const { activeIndex } = this.gallery

    this.background.setActiveIndex(activeIndex)
    this.background.update()

    this.info.setActiveIndex(activeIndex)
  }

  destroy() {
    this.environment.destroy()
    this.background.destroy()
    this.gallery.destroy()
  }
}
