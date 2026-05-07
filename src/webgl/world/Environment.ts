import type { Experience } from '@webgl'
import * as THREE from 'three'

export class Environment {
  private experience: Experience
  private ambientLight: THREE.AmbientLight
  private directionalLight: THREE.DirectionalLight

  constructor(experience: Experience) {
    this.experience = experience

    this.experience.scene.fog = new THREE.Fog('#050505', 8, 35)

    this.ambientLight = new THREE.AmbientLight('#ffffff', 1.5)
    this.directionalLight = new THREE.DirectionalLight('#ffffff', 3)

    this.directionalLight.position.set(3, 4, 5)

    this.experience.scene.add(this.ambientLight, this.directionalLight)
  }

  destroy() {
    this.experience.scene.remove(this.ambientLight, this.directionalLight)
  }
}
