import type { Experience } from '@webgl'
import * as THREE from 'three'

export interface GalleryItemOptions {
  color: THREE.Color
  position: THREE.Vector3
}

export class GalleryItem {
  mesh: THREE.Mesh

  private experience: Experience
  private geometry: THREE.PlaneGeometry
  private material: THREE.MeshStandardMaterial

  constructor(experience: Experience, options: GalleryItemOptions) {
    this.experience = experience

    this.geometry = new THREE.PlaneGeometry(3, 2)
    this.material = new THREE.MeshStandardMaterial({
      color: options.color,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.copy(options.position)

    this.experience.scene.add(this.mesh)
  }

  destroy() {
    this.experience.scene.remove(this.mesh)

    this.geometry.dispose()
    this.material.dispose()
  }
}
