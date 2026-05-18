import type { Experience } from '@webgl'
import * as THREE from 'three'
import { config } from '../config'

export class Camera {
  instance: THREE.PerspectiveCamera

  private experience: Experience

  constructor(experience: Experience) {
    this.experience = experience

    const { fov, near, far, position } = config.camera

    this.instance = new THREE.PerspectiveCamera(
      fov,
      this.experience.sizes.aspectRatio,
      near,
      far,
    )

    this.instance.position.copy(position)

    this.experience.scene.add(this.instance)
  }

  resize() {
    this.instance.aspect = this.experience.sizes.aspectRatio
    this.instance.updateProjectionMatrix()
  }

  destroy() {
    this.experience.scene.remove(this.instance)
  }
}
