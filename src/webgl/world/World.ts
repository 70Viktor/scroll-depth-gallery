import type { Experience } from '../Experience'
import Environment from './Environment'

export class World {
  experience: Experience
  environment: Environment

  constructor(experience: Experience) {
    this.experience = experience

    this.environment = new Environment(this.experience)
  }

  update() {}

  destroy() {
    this.environment.destroy()
  }
}
