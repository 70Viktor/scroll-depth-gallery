import * as THREE from 'three'
import { Camera, Renderer, Resources, Sizes, Time } from './core'
import { PointerController, ScrollController } from './input'
import { World } from './world'

export class Experience {
  canvas: HTMLCanvasElement
  scene: THREE.Scene
  sizes: Sizes
  time: Time

  scroll: ScrollController
  pointer: PointerController

  camera: Camera
  renderer: Renderer
  resources: Resources
  world: World

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.sizes = new Sizes()
    this.time = new Time()

    this.scroll = new ScrollController()
    this.pointer = new PointerController()

    this.camera = new Camera(this)
    this.renderer = new Renderer(this)
    this.resources = new Resources()
    this.world = new World(this)

    this.sizes.onResize(() => this.resize())
    this.time.onTick(() => this.update())
  }

  private resize() {
    this.camera.resize()
    this.renderer.resize()
    this.world.resize()
  }

  private update() {
    this.pointer.update()
    this.scroll.update()
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
    this.resources.destroy()
  }
}
