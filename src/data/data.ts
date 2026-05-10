import * as THREE from 'three'
import type { Size } from '../webgl/utils'

interface DataItem {
  color: THREE.ColorRepresentation
  bgColor: THREE.ColorRepresentation
  blob1Color: THREE.ColorRepresentation
  blob2Color: THREE.ColorRepresentation
  offset: THREE.Vector2
  size: Size
}

export const data: DataItem[] = [
  {
    color: '#F5B7B1',
    bgColor: '#FDF2F0',
    blob1Color: '#F8D7DA',
    blob2Color: '#F9E2D2',
    offset: new THREE.Vector2(1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#A9CCE3',
    bgColor: '#EEF6FB',
    blob1Color: '#D6EAF8',
    blob2Color: '#D4E6F1',
    offset: new THREE.Vector2(-0.8, 0),
    size: { width: 3, height: 2 },
  },

  {
    color: '#A3E4D7',
    bgColor: '#F1FBF8',
    blob1Color: '#D1F2EB',
    blob2Color: '#D4EFDF',
    offset: new THREE.Vector2(0.8, 0),
    size: { width: 3, height: 2 },
  },

  {
    color: '#D7BDE2',
    bgColor: '#F8F3FA',
    blob1Color: '#E8DAEF',
    blob2Color: '#F5E6F2',
    offset: new THREE.Vector2(-1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#F9E79F',
    bgColor: '#FFFBEF',
    blob1Color: '#FCF3CF',
    blob2Color: '#FDEBD0',
    offset: new THREE.Vector2(0.8, 0),
    size: { width: 3, height: 2 },
  },

  {
    color: '#F5CBA7',
    bgColor: '#FFF7F2',
    blob1Color: '#FAD7C9',
    blob2Color: '#FDEBD0',
    offset: new THREE.Vector2(1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#AED6F1',
    bgColor: '#F4FAFD',
    blob1Color: '#D6EAF8',
    blob2Color: '#EAF2F8',
    offset: new THREE.Vector2(-1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#F5B7D5',
    bgColor: '#FFF5FA',
    blob1Color: '#FADBD8',
    blob2Color: '#FDEEF4',
    offset: new THREE.Vector2(1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#A2D9CE',
    bgColor: '#F3FCFA',
    blob1Color: '#D0ECE7',
    blob2Color: '#E8F8F5',
    offset: new THREE.Vector2(-0.8, 0),
    size: { width: 3, height: 2 },
  },

  {
    color: '#D2B4DE',
    bgColor: '#FAF5FC',
    blob1Color: '#EBDEF0',
    blob2Color: '#F5EEF8',
    offset: new THREE.Vector2(0.8, 0),
    size: { width: 3, height: 2 },
  },
] as const
