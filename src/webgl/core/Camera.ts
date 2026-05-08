import type { Experience } from '@webgl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { config } from '../config'

export class Camera {
  instance: THREE.PerspectiveCamera
  controls: OrbitControls

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

    this.controls = new OrbitControls(this.instance, this.experience.canvas)
    this.controls.enableZoom = false

    this.setupDebug()

    this.experience.scene.add(this.instance)
  }

  setupDebug() {
    if (!this.experience.debug.enabled) return

    const folder = this.experience.debug.gui!.addFolder('Camera')

    folder.add(this.instance.position, 'x').min(-10).max(10).step(0.1)
    folder.add(this.instance.position, 'y').min(-10).max(10).step(0.1)
    folder.add(this.instance.position, 'z').min(-20).max(20).step(0.1)
    folder
      .add(this.instance, 'fov')
      .min(10)
      .max(100)
      .step(1)
      .onChange(() => {
        this.instance.updateProjectionMatrix()
      })
  }

  resize() {
    this.instance.aspect = this.experience.sizes.aspectRatio
    this.instance.updateProjectionMatrix()
  }

  update() {
    // Later: parallax, camera rig, scroll movement
  }

  destroy() {
    this.controls.dispose()
    this.experience.scene.remove(this.instance)
  }
}
