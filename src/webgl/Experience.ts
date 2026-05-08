import * as THREE from 'three'
import { Camera, Debug, Renderer, Sizes, Time } from './core'
import { PointerController, ScrollController } from './input'
import { World } from './world'

export class Experience {
  canvas: HTMLCanvasElement
  scene: THREE.Scene

  debug: Debug

  scroll: ScrollController
  pointer: PointerController

  sizes: Sizes
  time: Time
  camera: Camera
  renderer: Renderer
  world: World

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas

    this.scene = new THREE.Scene()
    this.debug = new Debug()

    this.scroll = new ScrollController(this)
    this.pointer = new PointerController()

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
    this.pointer.update()
    this.scroll.update()
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  destroy() {
    this.pointer.destroy()
    this.scroll.destroy()
    this.sizes.destroy()
    this.time.destroy()
    this.camera.destroy()
    this.renderer.destroy()
    this.debug.destroy()
  }
}
