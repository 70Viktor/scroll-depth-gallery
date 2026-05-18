import { images } from '@assets'
import { createBgPalette } from '@utils'
import * as THREE from 'three'

interface DataItem {
  src: string
  bgColor: THREE.ColorRepresentation
  bgLightColor: THREE.ColorRepresentation
  bgDarkColor: THREE.ColorRepresentation
  offset: THREE.Vector2
  width: number
  title: string
  year: number
}

export const data: DataItem[] = [
  {
    src: images[1],
    offset: new THREE.Vector2(1, 0),
    width: 3,
    title: 'Мое родное село',
    year: 2012,
    ...createBgPalette('#E7D5C9'),
  },
  {
    src: images[2],
    offset: new THREE.Vector2(-1, 0),
    width: 3,
    title: 'Золотые купола',
    year: 2012,
    ...createBgPalette('#8AA8C4'),
  },
  {
    src: images[3],
    offset: new THREE.Vector2(1, 0),
    width: 3,
    title: 'Осенний листопад',
    year: 2013,
    ...createBgPalette('#DA9804', 'dark'),
  },
  {
    src: images[4],
    offset: new THREE.Vector2(-1, 0),
    width: 3,
    title: 'Сибирь. Тайга.',
    year: 2017,
    ...createBgPalette('#4F5839', 'dark'),
  },
  {
    src: images[5],
    offset: new THREE.Vector2(1, 0),
    width: 3,
    title: 'Весенние заморозки',
    year: 2017,
    ...createBgPalette('#764A3D'),
  },
  {
    src: images[6],
    offset: new THREE.Vector2(-1, 0),
    width: 3,
    title: 'В зимнем парке',
    year: 2017,
    ...createBgPalette('#776D54', 'dark'),
  },
  {
    src: images[7],
    offset: new THREE.Vector2(1, 0),
    width: 3,
    title: 'Лесная река',
    year: 2015,
    ...createBgPalette('#B1A93F', 'dark'),
  },
  {
    src: images[8],
    offset: new THREE.Vector2(-1, 0),
    width: 3,
    title: 'Большая вода',
    year: 2013,
    ...createBgPalette('#C3C7D3'),
  },
]
