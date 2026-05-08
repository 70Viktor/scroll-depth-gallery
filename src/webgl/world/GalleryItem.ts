import type { Experience } from '@webgl'
import * as THREE from 'three'
import { clamp } from 'three/src/math/MathUtils.js'
import { config } from '../config'

export interface GalleryItemOptions {
  color: THREE.Color
  worldPosition: THREE.Vector3
}

export class GalleryItem {
  private experience: Experience

  private geometry: THREE.PlaneGeometry
  private material: THREE.MeshStandardMaterial
  private mesh: THREE.Mesh
  private wrapper: THREE.Group

  private worldPosition: THREE.Vector3
  private recycledCount = 0
  private scrollOffset = 0

  constructor(
    experience: Experience,
    { color, worldPosition }: GalleryItemOptions,
  ) {
    this.experience = experience

    this.geometry = new THREE.PlaneGeometry(3, 2)
    this.material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0,
      transparent: true,
      opacity: 1,
    })
    this.worldPosition = worldPosition

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.wrapper = new THREE.Group()
    this.wrapper.position.copy(this.worldPosition)

    this.wrapper.add(this.mesh)
    this.experience.scene.add(this.wrapper)
  }

  get resultZ(): number {
    return this.wrapper.position.z
  }

  set resultZ(value: number) {
    this.wrapper.position.z = value
  }

  updateResultZ() {
    const { totalDepth } = config.gallery
    this.resultZ =
      this.worldPosition.z + this.recycledCount * totalDepth + this.scrollOffset
  }

  updateWorldPositionZ(z: number) {
    this.worldPosition.z = z

    this.updateResultZ()
  }

  shiftRecycleCount(delta: number) {
    this.recycledCount += delta

    this.updateResultZ()
  }

  setOpacity(opacity: number) {
    this.material.opacity = clamp(opacity, 0, 1)
  }

  update() {
    const { scroll } = this.experience
    const { toWorldFactor } = config.scroll

    this.scrollOffset = scroll.current * toWorldFactor

    this.updateResultZ()
  }

  destroy() {
    this.experience.scene.remove(this.wrapper)

    this.geometry.dispose()
    this.material.dispose()
  }
}
