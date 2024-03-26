import { stops, type Stop } from '../settings/global'
import type { GenericObject } from '../global-types.js'

type CSSPropTypeLoc = 'color' | 'background' | 'background-alpha'

export type StrategyTypeLoc =
  | 'color'
  | 'color-stop'
  | 'color_rgb'
  | 'color_rgb/alpha'
  | 'color-stop_rgb/alpha'
  | 'color-stop_rgb'
  | 'color-token_rgb'
  | 'color-stop-token_rgb'

export type ContainerTypeLoc = {
  backgrounds?: Record<string, string>
  colors?: Record<string, string>
}

type GenerateCssPropsStr = (
  type: StrategyTypeLoc,
  name: string,
  mod?: string,
  opts?: Record<string, string | boolean>,
) => string
// Should be used when looping over colors.
// Return a cb which takes a stop to generate props when looping over stops.
// Example output of template str: rgb(var(--color-${colorName})) || rgb(var(--color-${colorName}-${stop}))

export const createGenerateCssColor = (
  generateCssPropsStr: Function,
  createGenerateCssPropKeyValuePair: Function,
  stops: Stop[],
) => {
  const generateCssPropKeyValuePair = createGenerateCssPropKeyValuePair(generateCssPropsStr)

  // Func: generateCssColor
  return function (container: any, collection?: string[], contrastColorsMap?: GenericObject) {
    // // Funcs not exported
    const generateContainerValue = (type: CSSPropTypeLoc, colorName: string) => {
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

    // // Funcs exported
    // funds that include a call back for optinoal stops have WCb postfix
    const bgsToGenWCb = (colorName: string) => {
      return generateContainerValue('background', colorName)
    }

    const bgsWAlphaToGen = (colorName: string) => {
      container[colorName] = generateCssPropsStr('color_rgb/alpha', colorName)
      return (stop: string) => {
        container[`${colorName}-${stop}`] = generateCssPropsStr('color-stop_rgb/alpha', colorName, stop)
      }
    }

    const colorsToGenWCb = (colorName: string) => {
      return generateContainerValue('color', colorName)
    }

    const colorClsesToGenWCb = (colorName: string) => {
      container[colorName] = {
        ...generateCssPropKeyValuePair('color', colorName),
      }

      return (stop: string) => {
        container[`${colorName}-${stop}`] = {
          ...generateCssPropKeyValuePair('color', colorName, stop),
        }
      }
    }

    const textOnToGenWCb = (colorName: string) => {
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

    const tokensToGenWCb = (colorName: string) => {
      return generateContainerToken(colorName)
    }

    // we need the option to get container/collection rather than return, we first use the ToGen functions, then AFTER we loop/create them, we may want to get the container and collection.
    // currently container and collection are global and we don't need to return them, but this may change.
    const getContainer = () => container
    const getCollection = () => collection
    return {
      bgsToGenWCb,
      bgsWAlphaToGen,
      colorsToGenWCb,
      colorClsesToGenWCb,
      textOnToGenWCb,
      tokensToGenWCb,
      getCollection,
      getContainer,
    }
  }
}

export const createGenerateCssPropKeyValuePair =
  (generateCssPropsStr: GenerateCssPropsStr) =>
  (type: CSSPropTypeLoc, name: string, wStop = '') => {
    const prop = type === 'color' ? 'color' : 'background-color'
    const id = wStop ? 'color-stop_rgb' : 'color_rgb'
    createGenerateCssPropKeyValuePair

    // Func: generateCssPropKeyValuePair
    return { [prop]: generateCssPropsStr(id, name, wStop) }
  }

export const generateCssPropsStr: GenerateCssPropsStr = (
  id: StrategyTypeLoc,
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

    if (id === 'color_rgb/alpha') {
      return `rgb(var(--color-${name}) / <alpha-value>)${cap}`
    }

    if (id === 'color-stop_rgb/alpha') {
      return `rgb(var(--color-${name}-${mod}) / <alpha-value>)${cap}`
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

export const generateCssColor = createGenerateCssColor(generateCssPropsStr, createGenerateCssPropKeyValuePair, stops)
