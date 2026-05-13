import * as THREE from 'three'
import { Camera, Debug, Renderer, Resources, Sizes, Time } from './core'
import { PointerController, ScrollController } from './input'
import { World } from './world'

export class Experience {
  canvas: HTMLCanvasElement
  scene: THREE.Scene
  sizes: Sizes
  time: Time
  debug: Debug

  scroll: ScrollController
  pointer: PointerController

  camera: Camera
  renderer: Renderer
  resources: Resources
  world: World | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.sizes = new Sizes()
    this.time = new Time()
    this.debug = new Debug()

    this.scroll = new ScrollController(this)
    this.pointer = new PointerController()

    this.camera = new Camera(this)
    this.renderer = new Renderer(this)
    this.resources = new Resources()

    this.sizes.onResize(() => this.resize())
    this.time.onTick(() => this.update())

    this.init()
  }

  private async init() {
    await this.resources.load()

    this.world = new World(this)
  }

  private resize() {
    this.camera.resize()
    this.renderer.resize()
    this.world?.resize()
  }

  private update() {
    this.pointer.update()
    this.scroll.update()
    this.camera.update()
    this.world?.update()
    this.renderer.update()
  }

  destroy() {
    this.pointer.destroy()
    this.scroll.destroy()
    this.sizes.destroy()
    this.time.destroy()
    this.camera.destroy()
    this.renderer.destroy()
    this.resources.destroy()
    this.debug.destroy()
  }
}
