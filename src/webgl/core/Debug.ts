import GUI from 'lil-gui'

export class Debug {
  // TODO: take from vite env
  enabled: boolean = true
  gui?: GUI
  constructor() {
    if (!this.enabled) return

    this.gui = new GUI()
  }

  destroy() {
    this.gui?.destroy()
  }
}
