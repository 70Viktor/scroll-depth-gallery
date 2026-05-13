import { images } from '@assets'
import * as THREE from 'three'

interface DataItem {
  src: string
  bgColor: THREE.ColorRepresentation
  bgLightColor: THREE.ColorRepresentation
  bgDarkColor: THREE.ColorRepresentation
  offset: THREE.Vector2
  width: number
}

export const data: DataItem[] = [
  {
    src: images[1],
    bgColor: '#E7DBE5',
    bgLightColor: '#FBEEE6',
    bgDarkColor: '#BBBEDF',
    offset: new THREE.Vector2(0.8, 0),
    width: 3,
  },
  {
    src: images[2],
    bgColor: '#99b6dc',
    bgLightColor: '#c2d7f0',
    bgDarkColor: '#6894c0',
    offset: new THREE.Vector2(-0.8, 0),
    width: 3,
  },
  {
    src: images[3],
    bgColor: '#caa171',
    bgLightColor: '#dcc3a1',
    bgDarkColor: '#9c7237',
    offset: new THREE.Vector2(0.8, 0),
    width: 3,
  },
  {
    src: images[4],
    bgColor: '#cad599',
    bgLightColor: '#e4e8d0',
    bgDarkColor: '#9fb05b',
    offset: new THREE.Vector2(-0.8, 0),
    width: 3,
  },
  {
    src: images[5],
    bgColor: '#d3a199',
    bgLightColor: '#e9c6c1',
    bgDarkColor: '#95635B',
    offset: new THREE.Vector2(0.8, 0),
    width: 3,
  },
  {
    src: images[6],
    bgColor: '#d8c6a1',
    bgLightColor: '#e8dfcd',
    bgDarkColor: '#a58e65',
    offset: new THREE.Vector2(-0.8, 0),
    width: 3,
  },
  {
    src: images[7],
    bgColor: '#c2c990',
    bgLightColor: '#dce2c0',
    bgDarkColor: '#85985d',
    offset: new THREE.Vector2(0.8, 0),
    width: 3,
  },
  {
    src: images[8],
    bgColor: '#eacec1',
    bgLightColor: '#f6e9e3',
    bgDarkColor: '#cb9c85',
    offset: new THREE.Vector2(-0.8, 0),
    width: 3,
  },
]

// export const data: DataItem[] = [
//   {
//     color: '#FF8E72',
//     bgColor: '#D8B7B0',
//     bgLightColor: '#F1DFDB',
//     bgDarkColor: '#B86558',
//     offset: new THREE.Vector2(1, 0),
//     size: { width: 2, height: 3 },
//   },

//   {
//     color: '#5FB7FF',
//     bgColor: '#B7C9D8',
//     bgLightColor: '#DCE7F1',
//     bgDarkColor: '#5B86B8',
//     offset: new THREE.Vector2(-0.8, 0),
//     size: { width: 3, height: 2 },
//   },

//   {
//     color: '#49D6A3',
//     bgColor: '#B5D0C7',
//     bgLightColor: '#DCECE7',
//     bgDarkColor: '#4FA386',
//     offset: new THREE.Vector2(0.8, 0),
//     size: { width: 3, height: 2 },
//   },

//   {
//     color: '#C987FF',
//     bgColor: '#CBB7D8',
//     bgLightColor: '#E8DFF1',
//     bgDarkColor: '#8D63B8',
//     offset: new THREE.Vector2(-1, 0),
//     size: { width: 2, height: 3 },
//   },

//   {
//     color: '#FFD84D',
//     bgColor: '#D8D0B0',
//     bgLightColor: '#F1EEDC',
//     bgDarkColor: '#B89A4F',
//     offset: new THREE.Vector2(0.8, 0),
//     size: { width: 3, height: 2 },
//   },

//   {
//     color: '#FF9F5A',
//     bgColor: '#D8BDAF',
//     bgLightColor: '#F2E1DA',
//     bgDarkColor: '#B87953',
//     offset: new THREE.Vector2(1, 0),
//     size: { width: 2, height: 3 },
//   },

//   {
//     color: '#6EBBFF',
//     bgColor: '#B5C6D6',
//     bgLightColor: '#DCE6F0',
//     bgDarkColor: '#5C86B8',
//     offset: new THREE.Vector2(-1, 0),
//     size: { width: 2, height: 3 },
//   },

//   {
//     color: '#FF74B1',
//     bgColor: '#D8B5C3',
//     bgLightColor: '#F2DCE5',
//     bgDarkColor: '#B85B84',
//     offset: new THREE.Vector2(1, 0),
//     size: { width: 2, height: 3 },
//   },

//   {
//     color: '#61E3C1',
//     bgColor: '#B5D2CB',
//     bgLightColor: '#DDF0EB',
//     bgDarkColor: '#52A890',
//     offset: new THREE.Vector2(-0.8, 0),
//     size: { width: 3, height: 2 },
//   },

//   {
//     color: '#FFB56B',
//     bgColor: '#D8C2AF',
//     bgLightColor: '#F2E5DA',
//     bgDarkColor: '#B88557',
//     offset: new THREE.Vector2(0.8, 0),
//     size: { width: 3, height: 2 },
//   },
// ] as const
