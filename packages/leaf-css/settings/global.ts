export const colorNames = [
  'primary',
  'secondary',
  'tertiary',
  'accent',
  'success',
  'warning',
  'error',
  'neutral',
] as const

export const stops = ['100', '200', '300', '400', '600', '700', '800', '900'] as const

export type ColorNames = (typeof colorNames)[number]
export type Stops = typeof stops
export type Stop = (typeof stops)[number]
