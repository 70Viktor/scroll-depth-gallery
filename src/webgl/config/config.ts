import { data } from '@data'

const tuning = {
  camera: {
    z: 8,
    near: 1,
    far: 100,
    fov: 45,
    fovMd: 75,
  },
  gallery: {
    gap: 8,
    startWorldZ: 0,
    itemActiveZ: -2,
    renderItems: 3,
    fadeDepth: 2.5,
  },
  deformation: {
    strength: 0.3,
  },
} as const

const { camera, gallery, deformation } = tuning

const totalDepth = gallery.gap * data.length
const recycleFromZ = tuning.camera.z - totalDepth
const recycleToZ = camera.z
const fadeFromZ = camera.z - camera.near - gallery.fadeDepth
const fadeToZ = camera.z - camera.near
const renderFromZ = camera.z - gallery.gap * gallery.renderItems
const renderToZ = camera.z

export const config = {
  camera,
  gallery: {
    ...gallery,
    totalDepth,
    recycleFromZ,
    recycleToZ,
  },
  scroll: {
    smooth: 0.04,
    wheelSpeed: 0.25,
    touchSpeed: 1.5,
    toWorldFactor: 0.045,
    maxVelocity: 1.8,
    velocitySmooth: 0.1,
  },
  fade: {
    from: fadeFromZ,
    to: fadeToZ,
  },
  render: {
    from: renderFromZ,
    to: renderToZ,
  },
  deformation,
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
    smooth: 0.04,
    breathSmooth: 0.04,
    breathStrength: 0.1,
  },
} as const
