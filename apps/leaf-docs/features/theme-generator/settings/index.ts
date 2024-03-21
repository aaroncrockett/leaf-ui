export const HEX_LENGTH = 7
export const colorData = { key: '', label: '', hex: '', rgb: '', on: '' } as const

export interface ColorData {
  key: string
  label: string
  hex: string
  rgb: string
  on: string
}
