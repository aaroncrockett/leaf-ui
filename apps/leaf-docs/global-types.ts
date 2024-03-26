import { colorNames, stops } from './settings'

export interface ThemeInfo {
  theme: Theme
  name: string
}

export interface Theme {
  colors: { [key: string]: string }
  general: { [key: string]: string }
  name: string
}

export type LeafColorName = typeof colorNames
export type LeafColorNames = (typeof colorNames)[number]

export interface GenericStringValueObject {
  [key: string]: Record<string, string>
  // Define other properties if needed
}

export interface GenericObject {
  [key: string]: any
}
