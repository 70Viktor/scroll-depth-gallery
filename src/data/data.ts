import * as THREE from 'three'

interface DataItem {
  color: THREE.Color
  offset: THREE.Vector2
  bgColor: THREE.Color
}

export const data: DataItem[] = [
  {
    color: new THREE.Color('red'),
    bgColor: new THREE.Color('red').offsetHSL(0, -0.5, -0.05),
    offset: new THREE.Vector2(-0.8, 0),
  },
  {
    color: new THREE.Color('green'),
    bgColor: new THREE.Color('green').offsetHSL(0, -0.5, -0.05),
    offset: new THREE.Vector2(0.9, 0),
  },
  {
    color: new THREE.Color('blue'),
    bgColor: new THREE.Color('blue').offsetHSL(0, -0.5, -0.05),
    offset: new THREE.Vector2(-0.6, 0),
  },
  {
    color: new THREE.Color('purple'),
    bgColor: new THREE.Color('purple').offsetHSL(0, -0.5, -0.05),
    offset: new THREE.Vector2(0.7, 0),
  },
  {
    color: new THREE.Color('orange'),
    bgColor: new THREE.Color('orange').offsetHSL(0, -0.5, -0.05),
    offset: new THREE.Vector2(-0.8, 0),
  },
  {
    color: new THREE.Color('violet'),
    bgColor: new THREE.Color('violet').offsetHSL(0, -0.5, -0.05),
    offset: new THREE.Vector2(0.5, 0),
  },
  {
    color: new THREE.Color('white'),
    bgColor: new THREE.Color('white').offsetHSL(0, -0.5, -0.05),
    offset: new THREE.Vector2(0, 0),
  },
] as const
