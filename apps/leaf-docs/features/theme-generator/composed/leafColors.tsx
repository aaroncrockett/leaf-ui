import chroma from 'chroma-js'
import { reduceFuncs } from '../../../utils/index'

export interface LeafColorResult {
  success?: boolean
  result?: string[] | string
  errorMsg?: string
}

export const generateRandomHex = (lib: any) => () => {
  try {
    const hex: string = lib.random().hex()
    return {
      success: true,
      result: hex,
    }
  } catch (e) {
    return {
      success: false,
      result: '',
      errorMsg: e.message,
    }
  }
}

export const generateRotatedHue = (lib: any) => (color: string, by: string) => {
  return chroma(color).set('hsl.h', by).hex()

  console.warn('You passed in an unsupported type.')
}

export const generateTriadColors = (lib: any) => (generateRotatedHue: any) => (color: string) => {
  try {
    const color2 = generateRotatedHue(color, '+120')
    const color3 = generateRotatedHue(color, '-120')
    return { result: [color2, color3], success: true }
  } catch (e) {
    console.error(e)
    return { success: false, errorMsg: e.message }
  }
}

export const depFuncs = [generateRandomHex, generateRotatedHue, generateTriadColors]

export const createLeafColors = (reduceFuncs: any) => (lib: any, depFuncs: any[]) => {
  const funcs = reduceFuncs(depFuncs, [lib])

  // funcs dep on other color funcs
  const generateTriadColors = funcs.generateTriadColors(funcs.generateRotatedHue)

  return {
    generateRandomHex: funcs.generateRandomHex,
    generateRotatedHue: funcs.generateRotatedHue,
    generateTriadColors: generateTriadColors,
  }
}

const createLeafColorsWDepends = createLeafColors(reduceFuncs)

export const leafColors = createLeafColorsWDepends(chroma, depFuncs)
