import type { Experience } from '@webgl'
import * as THREE from 'three'
import { clamp } from 'three/src/math/MathUtils.js'
import { config } from '../config'
import { galleryShaders } from '../shaders'

export interface GalleryItemOptions {
  color: THREE.Color
  bgColor: THREE.Color
  worldPosition: THREE.Vector3
}

export class GalleryItem {
  private experience: Experience

  private geometry: THREE.PlaneGeometry
  private material: THREE.ShaderMaterial
  private mesh: THREE.Mesh
  private wrapper: THREE.Group

  private worldPosition: THREE.Vector3
  private recycledCount = 0
  private scrollOffset = 0

  bgColor: THREE.Color

  constructor(experience: Experience, options: GalleryItemOptions) {
    const { color, bgColor, worldPosition } = options
    const { deformation } = config.gallery
    this.experience = experience

    this.geometry = new THREE.PlaneGeometry(3, 2, 32, 32)
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        u_color: { value: color },
        u_opacity: { value: 1 },
        u_velocity: { value: this.experience.scroll.normalizedVelocity },
        u_strength: { value: deformation.strength },
      },
      vertexShader: galleryShaders.vertex,
      fragmentShader: galleryShaders.fragment,
    })
    this.worldPosition = worldPosition
    this.bgColor = bgColor

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

  setVelocity(velocity: number) {
    this.material.uniforms.u_velocity.value = velocity
  }

  setOpacity(opacity: number) {
    this.material.uniforms.u_opacity.value = clamp(opacity, 0, 1)
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
