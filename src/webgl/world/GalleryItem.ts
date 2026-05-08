import type { Experience } from '@webgl'
import * as THREE from 'three'
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
  private parallaxOffset = new THREE.Vector2()

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

  updateWorldPositionZ(z: number) {
    this.worldPosition.z = z
  }

  shiftRecycleCount(delta: number) {
    this.recycledCount += delta
  }

  setVelocity(velocity: number) {
    this.material.uniforms.u_velocity.value = velocity
  }

  setOpacity(opacity: number) {
    this.material.uniforms.u_opacity.value = THREE.MathUtils.clamp(
      opacity,
      0,
      1,
    )
  }

  update() {
    const { scroll, pointer } = this.experience

    this.scrollOffset = scroll.current * config.scroll.toWorldFactor
    this.parallaxOffset.x = pointer.current.x * config.parallax.strengthX
    this.parallaxOffset.y = pointer.current.y * config.parallax.strengthY

    const recycleOffset = this.recycledCount * config.gallery.totalDepth

    const x = this.worldPosition.x + this.parallaxOffset.x
    const y = this.worldPosition.y + this.parallaxOffset.y
    const z = this.worldPosition.z + this.scrollOffset + recycleOffset

    this.wrapper.position.set(x, y, z)
  }

  destroy() {
    this.experience.scene.remove(this.wrapper)

    this.geometry.dispose()
    this.material.dispose()
  }
}
