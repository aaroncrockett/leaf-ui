import type { GenericObject, Theme } from '../types.js'

import { stringify } from 'javascript-stringify'
// Utils and settings
import { camelToKebab, getContrastYIQ, reduceToCamelCasingValue } from './utils.ts'
import { stops } from '../settings/global.js'
import { AT_TW_BASE, AT_TW_COMPONENTS, AT_TW_UTILITIES } from '../settings/index.js'

type ColorType = 'color' | 'background'

export type CssPropsArgType =
  | 'color'
  | 'color-stop'
  | 'color_rgb'
  | 'color-stop_rgb'
  | 'color-token_rgb'
  | 'color-stop-token_rgb'

export type ContainerType = {
  backgrounds?: Record<string, string>
  colors?: Record<string, string>
}

type GenerateCssPropsStr = (
  type: CssPropsArgType,
  name: string,
  mod?: string,
  opts?: Record<string, string | boolean>,
) => string

export const buildThemeProps = (withTw: boolean, props: string[]) => {
  let head
  let foot

  const joinedProps = props.join(';\n')

  head = withTw ? `${AT_TW_BASE} \n ${AT_TW_COMPONENTS} \n ${AT_TW_UTILITIES} \n @layer base {\n:root {` : `:root {`

  foot = withTw ? `}\n}` : '\n}'

  return `${head} \n ${joinedProps} \n ${foot}`
}

export function convertMatchesToCamelCasing(matches: string[][]) {
  let results = []
  for (let i = 0; i < matches.length; i++) {
    let props: string[] = []
    if (matches.length > 1) {
      const camelCasedKey = reduceToCamelCasingValue(matches[i].slice(0, -1))
      props[0] = camelCasedKey
      props[1] = matches[i][1]
    } else {
      props = matches[i]
    }
    results.push(props)
  }
  return results
}

export function createContrastColorsMap(theme: Theme) {
  type ReturnTyp = {
    [key: string]: 'black' | 'white'
  }
  const contrastColorsMap: ReturnTyp = {}
  if (theme?.colors) {
    Object.entries(theme?.colors).forEach(([key, color]) => {
      const [r, g, b] = color.split(' ').map(Number)
      const contrastColor = getContrastYIQ(r, g, b)
      const newKey = extractColorAndNumber(key)
      contrastColorsMap[newKey] = contrastColor
    })
  }

  return contrastColorsMap
}

export function extractColorAndNumber(key: string): string {
  // Remove "--" from the start of the key
  const cleanedKey = key.startsWith('--') ? key.slice(2) : key

  const parts = cleanedKey.split('-')

  return parts.slice(1).join('-')
}

// Function to get only CSS Props used in our Components for TW.
// Returns a collection of CSS props.
// Example: [ "--font-sm: 1rem;", "--spacing-5: 1.25rem;"]
export function findPropsFromInternal(propOpts: Record<string, string>, propName: string, src: any) {
  const found = new Set<string>()

  for (const cssClass of Object.values(src)) {
    const cssString = stringify(cssClass, null, 2)

    if (cssString) {
      for (const key of Object.keys(propOpts)) {
        const propKey = `--${propName}-${key.replace('.', 'pt')}`

        const propKeyInContext = `var(${propKey})`

        let propKeyAndValue = ''

        propKeyAndValue = `${propKey}: ${propOpts[key]};`

        if (cssString.includes(propKeyInContext)) {
          found.add(propKeyAndValue)
        }
      }
    }
  }
  return [...found].sort((a: string, b: string) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0')
    const numB = parseInt(b.match(/\d+/)?.[0] || '0')
    if (isNaN(numA) || isNaN(numB)) {
      return a.localeCompare(b)
    }
    return numA - numB
  })
}

// returns CSS prop parts
// Example: [ [ "font", "sm" ], [ "font", "md" ]]
export function findPropsFromTheme(theme: Record<string, string>) {
  const found: string[][] = []

  for (const key in theme) {
    const value = theme[key]

    if (value.startsWith('var(')) {
      const prop = value.substring(value.indexOf('--'), value.length - 1)
      found.push(prop.replace('--', '').split('-'))
    }
  }

  return found
}

/**
 * Converts a prefix and an object of suffix-value pairs into a CSS string.
 *
 * - prefix: a more general value like 'spacing' or 'roundness')
 * - suffixed: a more specific value like 'none', 'sm', 'md')
 * - value: a string representing a hard value ('0px', '50%')
 *
 * If `varWrap` is true, the CSS values are wrapped in a `var()` function.
 *
 * * @example
 * prefix: 'ui'
 * *
 * typeValPair: {
 * roundness: '--rounded-md',
 * 'btn-roundness': '--rounded-full',
 * 'input-roundness': '--rounded-full',
 * }
 * *
 * varWrap = true
 * * result =  --rounded: var(--rounded-md);\n --ui-btn-roundness: var(--rounded-full);\n --ui-input-roundness: var(--rounded-full);\n
 */
export function objectToCSSProperties(prefix: string, typeValPair: Record<string, string | number>, varWrap = false) {
  let cssString = ''
  const kebabPrefix = camelToKebab(prefix)

  Object.keys(typeValPair).forEach((key) => {
    const cssKey = `--${kebabPrefix}-${key.replace('.', 'pt')}`
    const cssValue = varWrap ? `var(${typeValPair[key]})` : typeValPair[key]
    cssString += ` ${cssKey}: ${cssValue};\n`
  })

  return cssString
}

export function objectsToCSSProperties(cssProps: Record<string, Record<string, string | number>>) {
  let cssString = ''

  Object.keys(cssProps).forEach((key) => {
    const cssProperties = objectToCSSProperties(key, cssProps[key])
    cssString += cssProperties + '\n'
  })

  return cssString
}

// Function compoisition

// Should be used when looping over colors.
// Return a cb which takes a stop to generate props when looping over stops.
// Example output of template str: rgb(var(--color-${colorName})) || rgb(var(--color-${colorName}-${stop}))

export const createGenerateCssColor = (
  generateCssPropsStr: Function,
  createGenerateCssPropKeyValuePair: Function,
  stops: string[],
) => {
  const generateCssPropKeyValuePair = createGenerateCssPropKeyValuePair(generateCssPropsStr)

  return function (container: any, collection?: string[], contrastColorsMap?: GenericObject) {
    const generateContainerValue = (type: ColorType, colorName: string) => {
      const containerProp = type === 'color' ? 'colors' : 'backgrounds'
      const prefix = type === 'color' ? 'text' : 'bg'
      const prop = type === 'color' ? 'color' : 'background-color'

      container[containerProp]![`.${prefix}-${colorName}`] = {
        ...generateCssPropKeyValuePair(prop, colorName),
      }

      return (stop: string) => {
        container[containerProp]![`.${prefix}-${colorName}-${stop}`] = {
          ...generateCssPropKeyValuePair(prop, colorName, stop),
        }
      }
    }

    const generateContainerToken = (colorName: string) => {
      container.tokenBackgrounds![`.${colorName}-token`] = {
        ...generateCssPropKeyValuePair('background-color', colorName),
        ...generateCssPropKeyValuePair('color', colorName),
      }

      return (stop: string, contrastKey: number) => {
        container.tokenBackgrounds![`.${colorName}-${stop}-${stops[contrastKey]}-token`] = {
          ...generateCssPropKeyValuePair('background-color', colorName, stop),
          ...generateCssPropKeyValuePair('color', colorName, stop),
        }

        container.tokenBackgrounds![`.dark .${colorName}-${stop}-${stops[contrastKey]}-token`] = {
          ...generateCssPropKeyValuePair('background-color', colorName, stops[contrastKey]),
          ...generateCssPropKeyValuePair('color', colorName, stops[contrastKey]),
        }
      }
    }

    const backgroundsToGen = (colorName: string) => {
      return generateContainerValue('background', colorName)
    }

    const colorsToGen = (colorName: string) => {
      return generateContainerValue('color', colorName)
    }

    const colorClassesToGen = (colorName: string) => {
      container[colorName] = {
        ...generateCssPropKeyValuePair('color', colorName),
      }

      return (stop: string) => {
        container[`${colorName}-${stop}`] = {
          ...generateCssPropKeyValuePair('color', colorName, stop),
        }
      }
    }

    const textOnToGen = (colorName: string) => {
      if (collection && contrastColorsMap) {
        const textColorVal = contrastColorsMap[`${colorName}`]

        if (textColorVal) {
          const colorProp = generateCssPropsStr('color_rgb', (colorName = colorName), { cap: true })

          collection.push(`--text-on-${colorName}: ${textColorVal};\n`)
        }
      }

      return (stop: string) => {
        if (collection && contrastColorsMap) {
          const textColorVal = contrastColorsMap[`${colorName}`]

          if (textColorVal) {
            const colorProp = generateCssPropsStr('color-stop_rgb', (colorName = colorName), stop, { cap: true })
            collection.push(`--text-on-${colorName}-${stop}: ${textColorVal};\n`)
          }
        }
      }
    }

    const tokensToGen = (colorName: string) => {
      return generateContainerToken(colorName)
    }

    // we need the option to get container/collection rather than return, we first use the ToGen functions, then AFTER we loop/create them, we may want to get the container and collection.
    // currently container and collection are global and we don't need to return them, but this may change.
    const getContainer = () => container
    const getCollection = () => collection
    return {
      backgroundsToGen,
      colorsToGen,
      colorClassesToGen,
      textOnToGen,
      tokensToGen,
      getCollection,
      getContainer,
    }
  }
}

export const createGenerateCssPropKeyValuePair =
  (generateCssPropsStr: GenerateCssPropsStr) =>
  (type: ColorType, name: string, wStop = '') => {
    const prop = type === 'color' ? 'color' : 'background-color'
    const id = wStop ? 'color-stop_rgb' : 'color_rgb'
    return { [prop]: generateCssPropsStr(id, name, wStop) }
  }

export const generateCssPropsStr: GenerateCssPropsStr = (
  id: CssPropsArgType,
  name: string,
  mod?: string,
  opts?: Record<string, string | boolean>,
) => {
  const result = (() => {
    let cap = opts?.cap ? ';\n' : ''
    if (id === 'color') {
      return `var(--color-${name})${cap}`
    }

    if (id === 'color-stop') {
      if (!mod) return ''

      return `var(--color-${name}-${mod})${cap}`
    }

    if (id === 'color_rgb') {
      return `rgb(var(--color-${name}))${cap}`
    }

    if (id === 'color-stop_rgb') {
      if (!mod) return ''

      return `rgb(var(--color-${name}-${mod}))${cap}`
    }

    return ''
  })()

  if (result === '') console.error('missing props')

  return result
}

export const cssColorGenerate = createGenerateCssColor(generateCssPropsStr, createGenerateCssPropKeyValuePair, stops)
