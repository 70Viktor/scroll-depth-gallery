import type { Experience } from '@webgl'
import * as THREE from 'three'

const FOV = 35
const NEAR = 0.1
const FAR = 100

export class Camera {
  public instance: THREE.PerspectiveCamera
  private experience: Experience

  constructor(experience: Experience) {
    this.experience = experience

    this.instance = new THREE.PerspectiveCamera(
      FOV,
      this.experience.sizes.aspectRatio,
      NEAR,
      FAR,
    )

    this.instance.position.set(0, 0, 8)

    this.experience.scene.add(this.instance)
  }

  resize() {
    this.instance.aspect = this.experience.sizes.aspectRatio
    this.instance.updateProjectionMatrix()
  }

  update() {
    // Later: parallax, camera rig, scroll movement
  }

  destroy() {
    this.experience.scene.remove(this.instance)
  }
}
