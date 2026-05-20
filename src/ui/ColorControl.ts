import { data } from '@data'
import { getColorLuminance } from '@utils'
import gsap from 'gsap'
import * as THREE from 'three'

export class ColorControl {
  constructor(initialIndex: number) {
    const { bgColor } = data[initialIndex]

    gsap.set('html', { '--text-color': this.textColor(bgColor) })
  }

  updateIndex(index: number) {
    const { bgColor } = data[index]

    gsap.to('html', {
      '--text-color': this.textColor(bgColor),
      duration: 0.3,
      overwrite: true,
      ease: 'none',
    })
  }

  private textColor(bgColor: THREE.ColorRepresentation) {
    const luminance = getColorLuminance(bgColor)

    return luminance > 0.5 ? '#000000' : '#FFFFFF'
  }
}
