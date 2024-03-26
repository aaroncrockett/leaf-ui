import chroma from 'chroma-js'
import { reduceFuncs, replaceAllDblHashes } from '../../../utils/index'

export interface LeafColorResultLoc {
  data?: string[] | string
  errorMsg?: string
}

export const generateRandomHex = (lib: any) => () => {
  try {
    const hex: string = lib.random().hex()
    return {
      data: hex,
    }
  } catch (e) {
    return {
      errorMsg: e.message,
    }
  }
}

export const generateRotatedHueHex = (lib: any) => (color: string, by: string) => {
  return lib(color).set('hsl.h', by).hex()

  console.warn('You passed in an unsupported type.')
}

export const createGenerateTriadColors = (generateRotatedHueHex: any) =>
  // Func: generateTriadColors
  function (color: string) {
    try {
      const color2 = generateRotatedHueHex(color, '+120')
      const color3 = generateRotatedHueHex(color, '-120')
      return { data: [color2, color3] }
    } catch (e) {
      console.error(e)
      return { errorMsg: e.message }
    }
  }

export const createGetRgbString = (replaceAllDblHashes: any) =>
  // Func: getRgbString
  function (hex: string, separator: string = ' ') {
    const sanitizedHex = replaceAllDblHashes(hex)
    const colorParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sanitizedHex)

    if (!colorParts) return { errorMsg: 'invalid input' }

    const [, r, g, b] = colorParts

    return { data: `${parseInt(r, 16)}${separator}${parseInt(g, 16)}${separator}${parseInt(b, 16)}` }
  }

// Each function in libDepFuncs depends on a color. loop over then and pass it in.
export const libDepFuncs = [generateRandomHex, generateRotatedHueHex, createGenerateTriadColors]
// Pass the remainig in as an opts like object bc we don't know how many we will have. If they depend on something, pass the dep in here.
export const funcs = {
  getRgbString: createGetRgbString(replaceAllDblHashes),
  generateTriadColors: createGenerateTriadColors(generateRotatedHueHex),
}

export const createLeafColors = (reduceFuncs: any) => (lib: any, libDepFuncs: any[], funcs: any) => {
  const libFuncs = reduceFuncs(libDepFuncs, lib)

  return {
    generateRandomHex: libFuncs.generateRandomHex,
    generateRotatedHueHex: libFuncs.generateRotatedHueHex,
    generateTriadColors: funcs.generateTriadColors,
    getRgbString: funcs.getRgbString,
  }
}

const createLeafColorsWDepends = createLeafColors(reduceFuncs)

export const leafColors = createLeafColorsWDepends(chroma, libDepFuncs, funcs)
