import { data } from '@data'
import * as THREE from 'three'

export class Resources {
  private textureLoader = new THREE.TextureLoader()

  textures: THREE.Texture[] = []
  isLoaded = false

  async load() {
    const promises = data.map(({ src }) => {
      return this.loadTexture(src)
    })

    this.textures = await Promise.all(promises)
    this.isLoaded = true
  }

  private loadTexture(src: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      const onLoad = (texture: THREE.Texture) => {
        resolve(texture)
      }
      const onProgress = (event: ProgressEvent) => {
        console.log(event)
      }
      const onError = (err: unknown) => {
        reject(err)
      }

      this.textureLoader.load(src, onLoad, onProgress, onError)
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
