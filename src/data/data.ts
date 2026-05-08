import * as THREE from 'three'

interface DataItem {
  color: THREE.Color
  offset: THREE.Vector2
}

export const data: DataItem[] = [
  {
    color: new THREE.Color('red'),
    offset: new THREE.Vector2(-0.8, 0),
  },
  {
    color: new THREE.Color('green'),
    offset: new THREE.Vector2(0.9, 0),
  },
  {
    color: new THREE.Color('blue'),
    offset: new THREE.Vector2(-0.6, 0),
  },
  {
    color: new THREE.Color('purple'),
    offset: new THREE.Vector2(0.7, 0),
  },
  {
    color: new THREE.Color('orange'),
    offset: new THREE.Vector2(-0.8, 0),
  },
  {
    color: new THREE.Color('violet'),
    offset: new THREE.Vector2(0.5, 0),
  },
  {
    color: new THREE.Color('white'),
    offset: new THREE.Vector2(0, 0),
  },
] as const
