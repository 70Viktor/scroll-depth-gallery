import { data } from '@data'
import type { Experience } from '@webgl'
import * as THREE from 'three'
import { config } from '../config'
import { backgroundShaders } from '../shaders'
import { SmoothColor } from '../utils'

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
  private blob1Color: SmoothColor
  private blob2Color: SmoothColor

  constructor(experience: Experience) {
    this.experience = experience
    const { bgColor, blob1Color, blob2Color } = data[this.activeIndex]
    const { smooth } = config.bg

    this.bgColor = new SmoothColor(bgColor, smooth)
    this.blob1Color = new SmoothColor(blob1Color, smooth)
    this.blob2Color = new SmoothColor(blob2Color, smooth)

    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera()

    this.bgGeomtry = new THREE.PlaneGeometry(2, 2)
    this.bgMaterial = new THREE.ShaderMaterial({
      depthWrite: false,
      depthTest: false,
      uniforms: {
        u_color: { value: this.bgColor.value },
        u_blob1Color: { value: this.blob1Color.value },
        u_blob2Color: { value: this.blob2Color.value },
        u_blobRadius: { value: config.bg.blobRadius },
        u_blobBlurRadius: { value: config.bg.blobBlurRadius },
        u_resolution: { value: this.experience.sizes.resolution },
        u_time: { value: this.experience.time.elapsed },
        u_noiseStrength: { value: 0.05 },
        u_breath: {
          value: this.breathCurrent,
        },
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

    const { bgColor, blob1Color, blob2Color } = data[this.activeIndex]

    this.bgColor.value = bgColor
    this.blob1Color.value = blob1Color
    this.blob2Color.value = blob2Color
  }

  resize() {
    this.bgMaterial.uniforms.u_resolution.value =
      this.experience.sizes.resolution
  }

  update() {
    this.bgColor.update()
    this.blob1Color.update()
    this.blob2Color.update()

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
