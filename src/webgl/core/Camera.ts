import type { Experience } from '@webgl'
import gsap from 'gsap'
import * as THREE from 'three'
import { config } from '../config'

const intro1Offset = new THREE.Vector3(0, 4, 8)
const intro2Offset = new THREE.Vector3(0, 0, 4)

export class Camera {
  instance: THREE.PerspectiveCamera

  private experience: Experience

  private intro1Position: THREE.Vector3
  private intro2Position: THREE.Vector3
  private basePosition: THREE.Vector3

  constructor(experience: Experience) {
    this.experience = experience

    const { near, far, position } = config.camera

    this.instance = new THREE.PerspectiveCamera(
      this.fov,
      this.experience.sizes.aspectRatio,
      near,
      far,
    )

    this.intro1Position = position.clone().add(intro1Offset)
    this.intro2Position = position.clone().add(intro2Offset)
    this.basePosition = position.clone()

    this.instance.position.copy(this.intro1Position)
    this.instance.lookAt(new THREE.Vector3(0))

    this.experience.scene.add(this.instance)
  }

  private get fov(): number {
    const { isMd } = this.experience.sizes
    const { fov, fovMd } = config.camera

    return isMd ? fovMd : fov
  }

  resize() {
    const { aspectRatio } = this.experience.sizes
    this.instance.aspect = aspectRatio
    this.instance.fov = this.fov
    this.instance.updateProjectionMatrix()
  }

  intro(): GSAPTimeline {
    const zeroPosition = new THREE.Vector3(0)

    const tl = gsap.timeline({
      onUpdate: () => this.instance.lookAt(zeroPosition),
    })

    tl.to(this.instance.position, {
      x: this.intro2Position.x,
      y: this.intro2Position.y,
      z: this.intro2Position.z,
      duration: 1,
      ease: 'power2.inOut',
    })

    tl.to(this.instance.position, {
      x: this.basePosition.x,
      y: this.basePosition.y,
      z: this.basePosition.z,
      duration: 1,
      ease: 'expo.inOut',
    })

    return tl
  }

  destroy() {
    this.experience.scene.remove(this.instance)
  }
}
