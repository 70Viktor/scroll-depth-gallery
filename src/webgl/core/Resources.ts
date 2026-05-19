import { data } from '@data'
import * as THREE from 'three'

type ProgressCallback = (progress: number) => void

export class Resources {
  textures: THREE.Texture[] = []

  progress = 0
  loaded = 0
  total = 0

  private textureLoader = new THREE.TextureLoader()

  private progressCallbacks = new Set<ProgressCallback>()

  async load() {
    const promises = data.map(({ src }) => {
      return this.loadTexture(src)
    })

    this.total = promises.length

    this.textures = await Promise.all(promises)
  }

  onProgress(callback: ProgressCallback) {
    this.progressCallbacks.add(callback)
  }

  private emitProgress() {
    console.log(this.progress)
    this.progressCallbacks.forEach((callback) => callback(this.progress))
  }

  private loadTexture(src: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      const onLoad = (texture: THREE.Texture) => {
        this.loaded += 1
        this.progress = this.loaded / this.total

        this.emitProgress()

        resolve(texture)
      }
      const onError = (err: unknown) => {
        reject(err)
      }

      this.textureLoader.load(src, onLoad, undefined, onError)
    })
  }

  getTexture(index: number) {
    return this.textures[index]
  }

  destroy() {
    this.textures.forEach((texture) => texture.dispose())
    this.textures = []
  }
}
