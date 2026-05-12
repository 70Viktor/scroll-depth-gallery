import * as THREE from 'three'
import type { Size } from '../webgl/utils'

interface DataItem {
  color: THREE.ColorRepresentation
  bgColor: THREE.ColorRepresentation
  bgLightColor: THREE.ColorRepresentation
  bgDarkColor: THREE.ColorRepresentation
  offset: THREE.Vector2
  size: Size
}

export const data: DataItem[] = [
  {
    color: '#FF8E72',
    bgColor: '#D8B7B0',
    bgLightColor: '#F1DFDB',
    bgDarkColor: '#B86558',
    offset: new THREE.Vector2(1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#5FB7FF',
    bgColor: '#B7C9D8',
    bgLightColor: '#DCE7F1',
    bgDarkColor: '#5B86B8',
    offset: new THREE.Vector2(-0.8, 0),
    size: { width: 3, height: 2 },
  },

  {
    color: '#49D6A3',
    bgColor: '#B5D0C7',
    bgLightColor: '#DCECE7',
    bgDarkColor: '#4FA386',
    offset: new THREE.Vector2(0.8, 0),
    size: { width: 3, height: 2 },
  },

  {
    color: '#C987FF',
    bgColor: '#CBB7D8',
    bgLightColor: '#E8DFF1',
    bgDarkColor: '#8D63B8',
    offset: new THREE.Vector2(-1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#FFD84D',
    bgColor: '#D8D0B0',
    bgLightColor: '#F1EEDC',
    bgDarkColor: '#B89A4F',
    offset: new THREE.Vector2(0.8, 0),
    size: { width: 3, height: 2 },
  },

  {
    color: '#FF9F5A',
    bgColor: '#D8BDAF',
    bgLightColor: '#F2E1DA',
    bgDarkColor: '#B87953',
    offset: new THREE.Vector2(1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#6EBBFF',
    bgColor: '#B5C6D6',
    bgLightColor: '#DCE6F0',
    bgDarkColor: '#5C86B8',
    offset: new THREE.Vector2(-1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#FF74B1',
    bgColor: '#D8B5C3',
    bgLightColor: '#F2DCE5',
    bgDarkColor: '#B85B84',
    offset: new THREE.Vector2(1, 0),
    size: { width: 2, height: 3 },
  },

  {
    color: '#61E3C1',
    bgColor: '#B5D2CB',
    bgLightColor: '#DDF0EB',
    bgDarkColor: '#52A890',
    offset: new THREE.Vector2(-0.8, 0),
    size: { width: 3, height: 2 },
  },

  {
    color: '#FFB56B',
    bgColor: '#D8C2AF',
    bgLightColor: '#F2E5DA',
    bgDarkColor: '#B88557',
    offset: new THREE.Vector2(0.8, 0),
    size: { width: 3, height: 2 },
  },
] as const
