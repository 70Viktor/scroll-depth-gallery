import type { Experience } from '@webgl'
import * as THREE from 'three'
import { config } from '../config'

export class Breath {
  private experience: Experience
  private target = 1
  private current = 1
  private lastScrollTime = 0

  constructor(experience: Experience) {
    this.experience = experience
  }

  update(): number {
    const { breath } = config
    const { time, scroll } = this.experience

    if (!scroll.hasScrolled) return this.current

    const absVelocity = Math.abs(scroll.velocity)
    const isScrolling = absVelocity > breath.velocityThreshold

    if (isScrolling) {
      this.lastScrollTime = time.elapsedSec
    }

    const timeSinceScroll = time.elapsedSec - this.lastScrollTime
    const shouldRelease = !isScrolling && timeSinceScroll > breath.releaseDelay

    this.target = shouldRelease ? 1 : 1 + absVelocity * breath.velocityFactor
    const smooth = shouldRelease ? breath.smoothOut : breath.smoothIn

    this.current = THREE.MathUtils.lerp(this.current, this.target, smooth)

    return this.current
  }
}
