export const HEX_LENGTH = 7
export const colorData = { key: '', label: '', hex: '', rgb: '', on: '' } as const
import { colorNames, stopsWBase } from '../../../settings/global'

export interface ColorData {
  key: string
  label: string
  hex: string
  rgb: string
  on: string
}

export const steppedSwatchColorClasses: Record<string, Record<string, string>> = {}

colorNames.forEach((colorName) => {
  steppedSwatchColorClasses[colorName] = {}
  stopsWBase.forEach((stop) => {
    steppedSwatchColorClasses[colorName][stop] = stop === 'base' ? `bg-${colorName}` : `bg-${colorName}-${stop}`
  })
})
