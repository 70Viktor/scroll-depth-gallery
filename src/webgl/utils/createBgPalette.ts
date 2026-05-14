import * as THREE from 'three'

interface BgPalette {
  bgColor: THREE.ColorRepresentation
  bgDarkColor: THREE.ColorRepresentation
  bgLightColor: THREE.ColorRepresentation
}
type PaletteColorKey = keyof BgPalette
type PaletteVariant = 'default' | 'dark'

interface ColorConfig {
  maxS?: number
  minS?: number
  factorS: number
  l: number
}

const paletteConfig: Record<
  PaletteVariant,
  Record<PaletteColorKey, ColorConfig>
> = {
  default: {
    bgColor: {
      minS: 0.18,
      maxS: 0.6,
      factorS: 0.45,
      l: 0.72,
    },
    bgDarkColor: {
      minS: 0.2,
      maxS: 0.75,
      factorS: 0.75,
      l: 0.46,
    },
    bgLightColor: {
      minS: 0.12,
      maxS: 0.45,
      factorS: 0.22,
      l: 0.88,
    },
  },

  dark: {
    bgColor: {
      minS: 0.16,
      maxS: 0.55,
      factorS: 0.42,
      l: 0.42,
    },

    bgDarkColor: {
      minS: 0.22,
      maxS: 0.85,
      factorS: 0.82,
      l: 0.28,
    },

    bgLightColor: {
      minS: 0.14,
      maxS: 0.5,
      factorS: 0.3,
      l: 0.58,
    },
  },
}

const createPaletteColor = (
  target: THREE.HSL,
  variant: PaletteVariant,
  key: PaletteColorKey,
): THREE.Color => {
  const { minS = 0, maxS = 1, factorS, l } = paletteConfig[variant][key]

  return new THREE.Color().setHSL(
    target.h,
    THREE.MathUtils.clamp(target.s * factorS, minS, maxS),
    l,
  )
}

export const createBgPalette = (
  base: THREE.ColorRepresentation,
  variant: PaletteVariant = 'default',
): BgPalette => {
  const baseColor = new THREE.Color(base)
  const targetHSL: THREE.HSL = { h: 0, s: 0, l: 0 }

  baseColor.getHSL(targetHSL)

  const bgColor = createPaletteColor(targetHSL, variant, 'bgColor')
  const bgDarkColor = createPaletteColor(targetHSL, variant, 'bgDarkColor')
  const bgLightColor = createPaletteColor(targetHSL, variant, 'bgLightColor')

  return { bgColor, bgDarkColor, bgLightColor }
}
