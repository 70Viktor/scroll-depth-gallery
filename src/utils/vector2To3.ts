import * as THREE from 'three'

export const vector2To3 = (v2: THREE.Vector2, z = 0): THREE.Vector3 => {
  return new THREE.Vector3(v2.x, v2.y, z)
}
