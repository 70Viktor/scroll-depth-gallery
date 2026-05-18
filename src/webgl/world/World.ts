import { GalleryInfo, Preloader } from '@ui'
import type { Experience } from '../Experience'
import { Background } from './Background'
import { Environment } from './Environment'
import { Gallery } from './Gallery'

export class World {
  private experience: Experience
  private environment: Environment
  private background: Background
  private gallery: Gallery | null = null
  private info: GalleryInfo
  private preloader: Preloader

  constructor(experience: Experience) {
    this.experience = experience

    this.environment = new Environment(this.experience)
    this.background = new Background(this.experience)
    this.info = new GalleryInfo()
    this.preloader = new Preloader(this.experience)

    this.init()
  }

  private async init() {
    const { resources } = this.experience

    resources.onProgress(this.preloader.setProgress)
    resources.onLoad(this.preloader.hide)

    await resources.load()

    this.gallery = new Gallery(this.experience)
  }

  resize() {
    this.background.resize()
  }

  update() {
    if (!this.gallery) return

    this.gallery.update()

    const { activeIndex } = this.gallery

    this.background.setActiveIndex(activeIndex)
    this.background.update()

    this.info.setActiveIndex(activeIndex)
  }

  destroy() {
    this.environment.destroy()
    this.background.destroy()
    this.gallery?.destroy()
  }
}
