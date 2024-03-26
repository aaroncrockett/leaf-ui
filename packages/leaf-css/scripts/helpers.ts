import type { Theme } from '../types.js'

import { stringify } from 'javascript-stringify'
// Utils and settings
import { camelToKebab, getContrastYIQ, reduceToCamelCasingValue } from './utils.ts'
import { AT_TW_BASE, AT_TW_COMPONENTS, AT_TW_UTILITIES } from '../settings/index.js'

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
