import type { Experience } from '@webgl'
import * as THREE from 'three'

export class Renderer {
  instance: THREE.WebGLRenderer
  private experience: Experience

  constructor(experience: Experience) {
    this.experience = experience

    this.instance = new THREE.WebGLRenderer({
      canvas: this.experience.canvas,
      antialias: true,
    })

    this.instance.setSize(
      this.experience.sizes.width,
      this.experience.sizes.height,
    )

    this.instance.setPixelRatio(this.experience.sizes.pixelRatio)

    this.instance.outputColorSpace = THREE.SRGBColorSpace
    this.instance.toneMapping = THREE.ACESFilmicToneMapping
    this.instance.toneMappingExposure = 1
  }

  resize() {
    this.instance.setSize(
      this.experience.sizes.width,
      this.experience.sizes.height,
    )

    this.instance.setPixelRatio(this.experience.sizes.pixelRatio)
  }

  update() {
    this.instance.render(this.experience.scene, this.experience.camera.instance)
  }

  destroy() {
    this.instance.dispose()
  }
}
