import * as THREE from 'three'
import type { Experience } from '../Experience'
import { Environment } from './Environment'
import { Gallery } from './Gallery'

export class World {
  private experience: Experience
  private environment: Environment
  private gallery: Gallery

  private axesHelper: THREE.AxesHelper
  private gridHelper: THREE.GridHelper

  constructor(experience: Experience) {
    this.experience = experience

    this.environment = new Environment(this.experience)
    this.gallery = new Gallery(this.experience)

    this.axesHelper = new THREE.AxesHelper(5)
    this.gridHelper = new THREE.GridHelper(20, 20)

    this.experience.scene.add(this.axesHelper, this.gridHelper)
  }

  update() {
    this.gallery.update()
  }

  destroy() {
    this.environment.destroy()
    this.gallery.destroy()
  }
}
