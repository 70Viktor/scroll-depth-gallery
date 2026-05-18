import * as THREE from 'three'

export const getColorLuminance = (color: THREE.ColorRepresentation): number => {
  const { r, g, b } = new THREE.Color(color)

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
