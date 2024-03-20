import { expect, test } from 'bun:test'
// Types
import { GenericStringValueObject, Theme, ThemeInfo } from '../types'
// Mock data
import {
  createContrastColorsMap,
  createGenerateCssColor,
  createGenerateCssPropKeyValuePair,
  findPropsFromInternal,
  generateCssPropsStr,
  objectToCSSProperties,
} from './helpers.ts'

// Theme to test
import leafTheme from '../themes/leaf.js'

import { colorNames, stops } from '../settings/global.js'

import { accordion } from '../styles/components/accordion.js'
import { appRail } from '../styles/components/app-rail.js'
import { appShell } from '../styles/components/app-shell.js'
import { btn } from '../styles/elements/btn.js'
import { drawer } from '../styles/components/drawer.js'
import { input } from '../styles/elements/input.js'
import { slideToggle } from '../styles/components/slide-toggle.js'

const mocProps = {
  16: '4rem',
  1.5: '0.375rem',
  px: '1px',
  0: '0px',
  0.5: '0.125rem',
  7: '1.75rem',
}

const mocTokens = {
  roundness: '--rounded-md',
  'btn-roundness': '--rounded-full',
  'input-roundness': '--rounded-full',
}

const mergedCSSInJsCompsForTW = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...drawer,
  ...slideToggle,
}

const mergeCSSInJSCompsAndElementsForTw = {
  ...mergedCSSInJsCompsForTW,
  ...btn,
  ...input,
}

// Test objectToCSSProperties
test('objectToCSSProperties function with Moc Tokens', () => {
  const prefix = 'ui'
  const varWrap = true

  const result = objectToCSSProperties(prefix, mocTokens, varWrap)

  // Check the entire output string
  expect(result).toBe(
    ' --ui-roundness: var(--rounded-md);\n --ui-btn-roundness: var(--rounded-full);\n --ui-input-roundness: var(--rounded-full);\n',
  )
})

test('objectToCSSProperties function with mocProps', () => {
  const prefix = 'size'
  const varWrap = false

  const result = objectToCSSProperties(prefix, mocProps, varWrap)

  // Check the entire output string
  expect(result).toBe(
    ' --size-0: 0px;\n --size-7: 1.75rem;\n --size-16: 4rem;\n --size-1pt5: 0.375rem;\n --size-px: 1px;\n --size-0pt5: 0.125rem;\n',
  )
})

// Test findPropsFromInternal
test('findPropsFromInternal function', () => {
  const result = findPropsFromInternal(mocProps, 'spacing', mergeCSSInJSCompsAndElementsForTw)
  expect(result).toContain('--spacing-7: 1.75rem;')
  expect(result).toContain('--spacing-16: 4rem;')
  expect(result.some((key: string) => key.startsWith('--spacing-77:'))).toBeFalsy()
  expect(result.some((key: string) => key.startsWith('--spacing-1:'))).toBeFalsy()
  expect(result.some((key: string) => key.startsWith('-spacing-16:'))).toBeFalsy()
})

function setup() {
  const themes: Record<string, ThemeInfo> = {
    leaf: { theme: leafTheme, name: 'leaf' },
  }
  const theme: Theme = themes.leaf.theme
  let backgrounds: GenericStringValueObject = {}
  let colors: GenericStringValueObject = {}
  let tokenBackgrounds: GenericStringValueObject = {}

  const colorClsContainer: any = {
    backgrounds,
    colors,
    tokenBackgrounds,
  }

  let derivedColorPropsColl: string[] = []

  const cssColorGenerate = createGenerateCssColor(generateCssPropsStr, createGenerateCssPropKeyValuePair, stops)

  const contrastMap = createContrastColorsMap(theme)

  return { colorClsContainer, derivedColorPropsColl, cssColorGenerate, contrastMap }
}

test('generateCssPropKeyValuePair should return an object with the correct string within colorNames loop for standard and stop colors.', () => {
  const generateCssPropKeyValuePair = createGenerateCssPropKeyValuePair(generateCssPropsStr)
  const pair = generateCssPropKeyValuePair('color', 'primary')
  expect(pair).toEqual({ color: 'rgb(var(--color-primary))' })

  const pairWStop = generateCssPropKeyValuePair('color', 'primary', '200')

  expect(pairWStop).toEqual({ color: 'rgb(var(--color-primary-200))' })
})

test('backgroundsToGen and colorsToGenForStops should be in colorNames.forEach and should return an object. The object should contain the expected keys and values.', () => {
  const { colorClsContainer, derivedColorPropsColl, cssColorGenerate, contrastMap } = setup()

  const { backgroundsToGen, colorsToGen, textOnToGen } = cssColorGenerate(
    colorClsContainer,
    derivedColorPropsColl,
    contrastMap,
  )

  colorNames.forEach((colorName: string) => {
    const backgroundsForStops = backgroundsToGen(colorName)
    const colorsToGenForStops = colorsToGen(colorName)
    const textOnToGenForStops = textOnToGen(colorName)
    stops.forEach((stop) => {
      backgroundsForStops(stop)
      colorsToGenForStops(stop)
    })
  })
  expect(colorClsContainer).toHaveProperty('backgrounds')
  expect(colorClsContainer).toHaveProperty('colors')

  const bgKeys = Object.keys(colorClsContainer.backgrounds)
  const hasPropStartsWBg = bgKeys.some((key) => key.startsWith('.bg'))

  expect(hasPropStartsWBg).toBeTruthy()

  const hasValWColorPrimaryBg = bgKeys.some((key) =>
    colorClsContainer.backgrounds![key]['background-color'].includes('--color-primary'),
  )

  expect(hasValWColorPrimaryBg).toBeTruthy()

  const colorKeys = Object.keys(colorClsContainer.colors)
  const hasPropStartsWColor = colorKeys.some((key) => key.startsWith('.text'))
  expect(hasPropStartsWColor).toBeTruthy()

  const hasValWColorPrimaryColor = bgKeys.some((key) =>
    colorClsContainer.backgrounds![key]['background-color'].includes('--color-primary'),
  )

  expect(hasValWColorPrimaryColor).toBeTruthy()
})

test('textOnToGen should be in colorNames.forEach and should return an array and should contain the correct strings', () => {
  const { colorClsContainer, derivedColorPropsColl, cssColorGenerate, contrastMap } = setup()

  const { textOnToGen } = cssColorGenerate(colorClsContainer, derivedColorPropsColl, contrastMap)

  colorNames.forEach((colorName: string) => {
    const textOnForStops = textOnToGen(colorName)

    stops.forEach((stop) => {
      textOnForStops(stop)
    })
  })

  expect(Array.isArray(derivedColorPropsColl)).toBeTrue()
  expect(derivedColorPropsColl.some((str) => str.startsWith('--text-on-primary'))).toBeTruthy()

  expect(derivedColorPropsColl.some((str) => str.startsWith('--text-on-primary-200: black'))).toBeTruthy()

  expect(derivedColorPropsColl.some((str) => str.startsWith('--text-on-primary-900: black'))).toBeTruthy()
})

test('tokensToGen should be in colorNames.forEach and should be an object. The properties of the returned object should have the correct values.', () => {
  const { colorClsContainer, derivedColorPropsColl, cssColorGenerate, contrastMap } = setup()

  const { tokensToGen } = cssColorGenerate(colorClsContainer, derivedColorPropsColl, contrastMap)

  colorNames.forEach((colorName: string) => {
    const tokensToGenForStops = tokensToGen(colorName)
    let j = stops.length - 1
    stops.forEach((stop) => {
      tokensToGenForStops(stop, j)
      j--
    })
  })

  expect(typeof colorClsContainer.tokenBackgrounds).toBe('object')

  expect(colorClsContainer).toHaveProperty('tokenBackgrounds')

  const hasDotProperty = Object.keys(colorClsContainer.tokenBackgrounds).some((key) => key.startsWith('.'))
  expect(hasDotProperty).toBe(true)

  const hasProp400 = Object.keys(colorClsContainer.tokenBackgrounds).some((key) =>
    key.startsWith('.primary-400-600-token'),
  )

  const hasProp900 = Object.keys(colorClsContainer.tokenBackgrounds).some((key) =>
    key.startsWith('.error-100-900-token'),
  )

  const hasDarkTokens = Object.keys(colorClsContainer.tokenBackgrounds).some((key) => key.startsWith('.dark .'))
  expect(hasProp400).toBe(true)
  expect(hasProp900).toBe(true)
  expect(hasProp900).toBe(hasDarkTokens)
})

test('colorClassesToGen', () => {
  const { colorClsContainer, cssColorGenerate } = setup()

  const { colorClassesToGen } = cssColorGenerate(colorClsContainer)

  colorNames.forEach((colorName) => {
    const classesToGenForStop = colorClassesToGen(colorName)
    stops.forEach((stop) => {
      classesToGenForStop(stop)
    })
  })
  expect(typeof colorClsContainer).toBe('object')
  const hasPrimary = Object.keys(colorClsContainer).some((key) => key.startsWith('primary'))
  expect(hasPrimary).toBe(true)

  const hasShade = Object.keys(colorClsContainer).some((key) => key.startsWith('primary-300'))
  expect(hasShade).toBe(true)

  const hasDarkShade = Object.keys(colorClsContainer).some((key) => key.startsWith('primary-800'))
  expect(hasDarkShade).toBe(true)

  const hasError = Object.keys(colorClsContainer).some((key) => key.startsWith('error'))
  expect(hasPrimary).toBe(true)
})

test('generateCssPropsStr function should return correct CSS variable for the expected type', () => {
  let result = generateCssPropsStr('color_rgb', 'red')

  expect(result).toBe('rgb(var(--color-red))')

  result = generateCssPropsStr('color', 'primary')

  expect(result).toBe('var(--color-primary)')
})

test('generateCssPropsStr function should return correct CSS variable when type is "color-stop_rgb" and colorName, stop are provided', () => {
  let result = generateCssPropsStr('color-stop_rgb', 'red', '50')

  expect(result).toBe('rgb(var(--color-red-50))')

  result = generateCssPropsStr('color-stop', 'red', '50')

  expect(result).toBe('var(--color-red-50)')
})

// test('generateCssPropsStr function should return an empty string when type is "color_rgb" and colorName is missing', () => {
//   const result = generateCssPropsStr('color_rgb', {})

//   expect(result).toBe('')
// })

// test('generateCssPropsStr function should return an empty string when type is "color-stop_rgb" and stop is missing', () => {
//   const result = generateCssPropsStr('color-stop_rgb', { colorName: 'red' })

//   expect(result).toBe('')
// })
