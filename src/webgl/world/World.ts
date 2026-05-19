import { GalleryInfo, Preloader } from '@ui'
import gsap from 'gsap'
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
    this.preloader = new Preloader()

    this.init()
  }

  private async init() {
    const { resources, scroll, camera } = this.experience

    resources.onProgress(this.preloader.setProgress)

    await resources.load()

    this.gallery = new Gallery(this.experience)

    const introTl = gsap.timeline({
      delay: 0.5,
      onComplete: () => scroll.enable(),
    })
    introTl.add(this.preloader.hide(), 0)
    introTl.add(camera.intro(), 0)
    introTl.add(this.gallery.intro(), 1)
    introTl.add(this.info.intro(), 1)
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
