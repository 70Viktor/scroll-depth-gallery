import { data } from '@data'
import * as THREE from 'three'

export const config = {
  camera: {
    fov: 45,
    near: 1,
    far: 100,
    position: new THREE.Vector3(0, 0, 8),
  },
  scroll: {
    smooth: 0.04,
    speed: 0.25,
    toWorldFactor: 0.045,
    maxVelocity: 1.5,
  },
  gallery: {
    gap: 8,
    count: data.length,
    recycleThreshold: 8,
    startWorld: 0,
    activeZ: -2.5,

    deformation: {
      strength: 0.3,
    },

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
    from: 3.5,
    to: 1,
  },
  parallax: {
    smooth: 0.04,
    strengthX: 0.15,
    strengthY: 0.08,
  },
  breath: {
    smoothIn: 0.03,
    smoothOut: 0.04,
    releaseDelay: 0,
    velocityThreshold: 0.2,
    velocityFactor: 0.15,
  },
  bg: {
    smooth: 0.01,
    breathSmooth: 0.04,
    breathStrength: 0.1,
  },
} as const
