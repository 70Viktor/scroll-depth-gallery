import { images } from '@assets'
import * as THREE from 'three'
import { createBgPalette } from '../webgl/utils'

interface DataItem {
  src: string
  bgColor: THREE.ColorRepresentation
  bgLightColor: THREE.ColorRepresentation
  bgDarkColor: THREE.ColorRepresentation
  offset: THREE.Vector2
  width: number
  title: string
}

export const data: DataItem[] = [
  {
    src: images[1],
    offset: new THREE.Vector2(0.8, 0),
    width: 3,
    title: 'Мое родное село',
    ...createBgPalette('#E7D5C9'),
  },
  {
    src: images[2],
    offset: new THREE.Vector2(-0.8, 0),
    width: 3,
    title: 'Золотые купола',
    ...createBgPalette('#8AA8C4'),
  },
  {
    src: images[3],
    offset: new THREE.Vector2(0.8, 0),
    width: 3,
    title: 'Осенний листопад',
    ...createBgPalette('#DA9804', 'dark'),
  },
  {
    src: images[4],
    offset: new THREE.Vector2(-0.8, 0),
    width: 3,
    title: 'Сибирь. Тайга.',
    ...createBgPalette('#4F5839', 'dark'),
  },
  {
    src: images[5],
    offset: new THREE.Vector2(0.8, 0),
    width: 3,
    title: 'Весенние заморозки',
    ...createBgPalette('#764A3D'),
  },
  {
    src: images[6],
    offset: new THREE.Vector2(-0.8, 0),
    width: 3,
    title: 'В зимнем парке',
    ...createBgPalette('#776D54', 'dark'),
  },
  {
    src: images[7],
    offset: new THREE.Vector2(0.8, 0),
    width: 3,
    title: 'Лесная река',
    ...createBgPalette('#B1A93F', 'dark'),
  },
  {
    src: images[8],
    offset: new THREE.Vector2(-0.8, 0),
    width: 3,
    title: 'Большая вода',
    ...createBgPalette('#C3C7D3'),
  },
]
