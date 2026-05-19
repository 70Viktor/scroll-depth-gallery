export {}

declare global {
  interface Window {
    __preloaderWarmup?: {
      stop: () => void
      get progress(): number
    }
  }
}
