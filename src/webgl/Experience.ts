import * as THREE from 'three'
import { Camera, Renderer, Sizes, Time } from './core'
import { World } from './world'

export class Experience {
  canvas: HTMLCanvasElement
  scene: THREE.Scene

  sizes: Sizes
  time: Time
  camera: Camera
  renderer: Renderer
  world: World

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas

    this.scene = new THREE.Scene()

    this.sizes = new Sizes()
    this.time = new Time()
    this.camera = new Camera(this)
    this.renderer = new Renderer(this)
    this.world = new World(this)

    this.sizes.onResize(() => this.resize())
    this.time.onTick(() => this.update())
  }

  private resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  private update() {
    this.camera.update()
    this.renderer.update()
  }

  destroy() {
    this.sizes.destroy()
    this.time.destroy()
    this.camera.destroy()
    this.renderer.destroy()
  }
}
