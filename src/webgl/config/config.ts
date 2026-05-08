import { data } from '@data'
import * as THREE from 'three'

export const config = {
  camera: {
    fov: 45,
    near: 0.5,
    far: 20,
    position: new THREE.Vector3(0, 0, 5),
  },
  scroll: {
    ease: 0.04,
    speed: 0.25,
    toWorldFactor: 0.03,
  },
  gallery: {
    gap: 5,
    count: data.length,
    recycleThreshold: 5,

    get totalDepth(): number {
      return this.gap * this.count
    },
    get frontThreshold(): number {
      return this.recycleThreshold
    },
    get backThreshold(): number {
      return this.recycleThreshold - this.totalDepth
    },
  },
  fade: {
    from: 0.5,
    to: 3.5,
  },
}
