import type { Experience } from '@webgl'
import * as THREE from 'three'

interface RenderPass {
  scene: THREE.Scene
  camera: THREE.Camera
}

export class Renderer {
  instance: THREE.WebGLRenderer
  private experience: Experience

  private worldRenderPass: RenderPass
  private bgRenderPass?: RenderPass

  constructor(experience: Experience) {
    this.experience = experience
    const { size, pixelRatio } = this.experience.sizes

    this.worldRenderPass = {
      scene: this.experience.scene,
      camera: this.experience.camera.instance,
    }

    this.instance = new THREE.WebGLRenderer({
      canvas: this.experience.canvas,
      antialias: true,
    })

    this.instance.setSize(size.x, size.y)
    this.instance.setPixelRatio(pixelRatio)

    this.instance.outputColorSpace = THREE.SRGBColorSpace
    this.instance.toneMapping = THREE.ACESFilmicToneMapping
    this.instance.toneMappingExposure = 1
    this.instance.autoClear = false
  }

  resize() {
    const { size, pixelRatio } = this.experience.sizes

    this.instance.setSize(size.x, size.y)
    this.instance.setPixelRatio(pixelRatio)
  }

  addBgRenderPass(pass: RenderPass) {
    this.bgRenderPass = pass
  }

  update() {
    this.instance.clear()

    if (this.bgRenderPass) {
      this.renderPass(this.bgRenderPass)
    }

    this.renderPass(this.worldRenderPass)
  }

  private renderPass({ scene, camera }: RenderPass) {
    this.instance.render(scene, camera)
  }

  destroy() {
    this.instance.dispose()
  }
}
