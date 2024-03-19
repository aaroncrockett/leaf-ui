import { colorNames, stops } from './settings'

export type ThemeItems = { [key: string]: string }

export type Theme = {
  colors: ThemeItems
  general: ThemeItems
  name: string
}

export interface ThemeInfo {
  theme: Theme
  name: string
}

export type LeafColorName = typeof colorNames
export type LeafColorNames = (typeof colorNames)[number]
export type Stops = (typeof stops)[number]

export interface GenericStringValueObject {
  [key: string]: Record<string, string>
  // Define other properties if needed
}

export interface GenericObject {
  [key: string]: any
}
