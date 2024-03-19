import { expect, test } from 'bun:test'

import { camelToKebab, capitalizeFirstLetter, getContrastYIQ, reduceToCamelCasingValue } from './utils.ts'

// Test getContrastYIQ
test('getContrastYIQ function should return correct contrast color for given RGB values', () => {
  // Test with color that should return 'black'
  expect(getContrastYIQ(255, 255, 255)).toBe('black')

  // Test with color that should return 'white'
  expect(getContrastYIQ(0, 0, 0)).toBe('white')

  // Test with color that should return 'black'
  expect(getContrastYIQ(200, 200, 200)).toBe('black')

  // Test with color that should return 'white'
  expect(getContrastYIQ(50, 50, 50)).toBe('white')
})

// Test capitalizeFirstLetter
test('capitalizeFirstLetter function should correctly capitalize the first letter of input strings', () => {
  expect(capitalizeFirstLetter('hello')).toBe('Hello')
  expect(capitalizeFirstLetter('world')).toBe('World')
  expect(capitalizeFirstLetter('bun')).toBe('Bun')
  expect(capitalizeFirstLetter('')).toBe('')
  expect(capitalizeFirstLetter('A')).toBe('A')
})

// Test reduceToCamelCasingValue
test('reduceToCamelCasingValue function should correctly convert array of strings to camelCase', () => {
  expect(reduceToCamelCasingValue(['bun', 'test'])).toBe('bunTest')
  expect(reduceToCamelCasingValue(['b', 'test'])).toBe('bTest')
  expect(reduceToCamelCasingValue(['b', 't'])).toBe('bT')
  expect(reduceToCamelCasingValue(['reduce', 'to', 'camel', 'casing', 'value'])).toBe('reduceToCamelCasingValue')
  expect(reduceToCamelCasingValue(['reduce'])).toBe('reduce')
})

// Test camelToKebab
test('camelToKebab should correctly change casing from camel to kebab', () => {
  expect(camelToKebab('uiRoundness')).toBe('ui-roundness')
  expect(camelToKebab('spacing')).toBe('spacing')
  expect(camelToKebab('font')).toBe('font')
  expect(camelToKebab('spacing1')).toBe('spacing1') // Ends with a number
  expect(camelToKebab('fontFamily')).toBe('font-family') // Two words
  expect(camelToKebab('backgroundColorNew')).toBe('background-color-new') //Three words
  expect(camelToKebab('backgroundColorNEw')).toBe('background-color-n-ew') // Double capital letter
  expect(camelToKebab('fFFont')).toBe('f-f-font') // Double capital letter further to the front
  expect(camelToKebab('fFFontTT')).toBe('f-f-font-t-t') // Double capital letters at the end
})
