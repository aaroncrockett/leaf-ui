import { expect, test } from 'bun:test'
// libs
import chroma from 'chroma-js'
// utils
import { reduceFuncs } from '../../../utils/index'
// test funcs
import { createLeafColors, depFuncs } from './leafColors'

test('createLeafColors functionality', () => {
  const createLeafColorsWDepends = createLeafColors(reduceFuncs)
  const instance = createLeafColorsWDepends(chroma, depFuncs)

  expect(instance).toHaveProperty('generateRandomHex')
})
