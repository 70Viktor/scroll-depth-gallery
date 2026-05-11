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
    color: '#FF8E72',
    bgColor: '#D8B7B0',
    blob1Color: '#F1DFDB',
    blob2Color: '#B86558',
    offset: new THREE.Vector2(1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#5FB7FF',
    bgColor: '#B7C9D8',
    blob1Color: '#DCE7F1',
    blob2Color: '#5B86B8',
    offset: new THREE.Vector2(-0.8, 0),
    size: { width: 3, height: 2 },
  },

  {
    color: '#49D6A3',
    bgColor: '#B5D0C7',
    blob1Color: '#DCECE7',
    blob2Color: '#4FA386',
    offset: new THREE.Vector2(0.8, 0),
    size: { width: 3, height: 2 },
  },

  {
    color: '#C987FF',
    bgColor: '#CBB7D8',
    blob1Color: '#E8DFF1',
    blob2Color: '#8D63B8',
    offset: new THREE.Vector2(-1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#FFD84D',
    bgColor: '#D8D0B0',
    blob1Color: '#F1EEDC',
    blob2Color: '#B89A4F',
    offset: new THREE.Vector2(0.8, 0),
    size: { width: 3, height: 2 },
  },

  {
    color: '#FF9F5A',
    bgColor: '#D8BDAF',
    blob1Color: '#F2E1DA',
    blob2Color: '#B87953',
    offset: new THREE.Vector2(1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#6EBBFF',
    bgColor: '#B5C6D6',
    blob1Color: '#DCE6F0',
    blob2Color: '#5C86B8',
    offset: new THREE.Vector2(-1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#FF74B1',
    bgColor: '#D8B5C3',
    blob1Color: '#F2DCE5',
    blob2Color: '#B85B84',
    offset: new THREE.Vector2(1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#61E3C1',
    bgColor: '#B5D2CB',
    blob1Color: '#DDF0EB',
    blob2Color: '#52A890',
    offset: new THREE.Vector2(-0.8, 0),
    size: { width: 3, height: 2 },
  },

  {
    color: '#FFB56B',
    bgColor: '#D8C2AF',
    blob1Color: '#F2E5DA',
    blob2Color: '#B88557',
    offset: new THREE.Vector2(0.8, 0),
    size: { width: 3, height: 2 },
  },
] as const
