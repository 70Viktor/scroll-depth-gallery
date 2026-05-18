import { data } from '@data'
import { SmoothColor } from '@utils'
import type { Experience } from '@webgl'
import * as THREE from 'three'
import { config } from '../config'
import { backgroundShaders } from '../shaders'

export class Background {
  private experience: Experience
  private scene: THREE.Scene
  private camera: THREE.OrthographicCamera

  private bgGeomtry: THREE.PlaneGeometry
  private bgMaterial: THREE.ShaderMaterial
  private bgMesh: THREE.Mesh

  private activeIndex = 0
  private breathCurrent = 0
  private breathTarget = 0

  private bgColor: SmoothColor
  private bgDarkColor: SmoothColor
  private bgLightColor: SmoothColor

  constructor(experience: Experience) {
    this.experience = experience
    const { bgColor, bgDarkColor, bgLightColor } = data[this.activeIndex]
    const { smooth } = config.bg

    this.bgColor = new SmoothColor(bgColor, smooth)
    this.bgDarkColor = new SmoothColor(bgDarkColor, smooth)
    this.bgLightColor = new SmoothColor(bgLightColor, smooth)

    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera()

    this.bgGeomtry = new THREE.PlaneGeometry(2, 2)
    this.bgMaterial = new THREE.ShaderMaterial({
      depthWrite: false,
      depthTest: false,
      uniforms: {
        u_color: { value: this.bgColor.value },
        u_darkColor: { value: this.bgDarkColor.value },
        u_lightColor: { value: this.bgLightColor.value },
        u_resolution: { value: this.experience.sizes.resolution },
        u_time: { value: this.experience.time.elapsed },
        u_noiseStrength: { value: 0.05 },
        u_breath: { value: this.breathCurrent },
      },
      fragmentShader: backgroundShaders.fragment,
      vertexShader: backgroundShaders.vertex,
    })

    this.bgMesh = new THREE.Mesh(this.bgGeomtry, this.bgMaterial)

    this.scene.add(this.bgMesh)

    this.experience.renderer.addBgRenderPass({
      scene: this.scene,
      camera: this.camera,
    })
  }

  setActiveIndex(index: number) {
    if (this.activeIndex === index) return

    this.activeIndex = index

    const { bgDarkColor, bgColor, bgLightColor } = data[this.activeIndex]

    this.bgDarkColor.value = bgDarkColor
    this.bgColor.value = bgColor
    this.bgLightColor.value = bgLightColor
  }

  resize() {
    this.bgMaterial.uniforms.u_resolution.value =
      this.experience.sizes.resolution
  }

  update() {
    this.bgDarkColor.update()
    this.bgColor.update()
    this.bgLightColor.update()

    this.bgMaterial.uniforms.u_time.value = this.experience.time.elapsed

    this.updateBreath()
  }

  private updateBreath() {
    const { normalizedVelocity } = this.experience.scroll
    const { breathSmooth, breathStrength } = config.bg

    this.breathTarget = Math.abs(normalizedVelocity) * breathStrength

    this.breathCurrent = THREE.MathUtils.lerp(
      this.breathCurrent,
      this.breathTarget,
      breathSmooth,
    )

    this.bgMaterial.uniforms.u_breath.value = this.breathCurrent
  }

  destroy() {
    this.bgGeomtry.dispose()
    this.bgMaterial.dispose()
  }
}
