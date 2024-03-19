/*
Script and style summary written in README.md under leaf.css

*/
// Themes
import leafTheme from '../themes/leaf.js'
// import paTheme from '../themes/pa.js'
// Settings
import { AT_TW_BASE, AT_TW_COMPONENTS, AT_TW_UTILITIES, colorNames, stops } from '../settings/index.js'

// Helpers and Utils
import {
  buildThemeProps,
  convertMatchesToCamelCasing,
  createContrastColorsMap,
  findPropsFromInternal,
  findPropsFromTheme,
  objectsToCSSProperties,
  cssColorGenerate,
} from './helpers.js'

import { getContrastYIQ } from './utils.js'
// Project Types
import type { GenericStringValueObject, GenericObject, Theme, ThemeInfo } from '../types.js'
// Package imports
// @ts-ignore
import CleanCSS from 'clean-css'
import postcss from 'postcss'
import { Result } from 'postcss'
import postcssJs from 'postcss-js'

import prettier from 'prettier'

// Properties, Base, Elements,  Components
// Properties match tw so we can remain consistant throughout our projects.
import { spacing } from '../styles/properties/spacing.js'
import { font } from '../styles/properties/font.js'
import { rounded } from '../styles/properties/rounded.js'
// Base styles
import { core } from '../styles/base/core.js'
// Elements consume properties. They use our generated CSS props so they work for non-TW and TW
import { btn } from '../styles/elements/btn.js'
import { input } from '../styles/elements/input.js'
// Components can consume Elements and Properties.
import { appShell } from '../styles/components/app-shell.js'
import { appRail } from '../styles/components/app-rail.js'
import { accordion } from '../styles/components/accordion.js'
import { drawer } from '../styles/components/drawer.js'
import { slideToggle } from '../styles/components/slide-toggle.js'

// We directly edit the theme file for these options.

const CSS_DIST_ROOT = 'dist/themes/'

const themes: Record<string, ThemeInfo> = {
  leaf: { theme: leafTheme, name: 'leaf' },
  // pa: { theme: paTheme, name: 'pa' },
}
const allThemes = Object.keys(themes)
export const getTwColors = () => {
  // All Token Background, Text, Border Colors
  const twColors: any = {}

  const { colorClassesToGen } = cssColorGenerate(twColors)

  colorNames.forEach((colorName: string) => {
    const classesToGenForStop = colorClassesToGen(colorName)
    stops.forEach((stop) => {
      classesToGenForStop(stop)
    })
  })

  return twColors
}

// Used to collect key/values to create classes and colors for TW
let backgrounds: GenericStringValueObject = {}
let colors: GenericStringValueObject = {}
let tokenBackgrounds: GenericStringValueObject = {}
// Used to collect collection of CSS Props as strings
let derivedColorPropsColl: string[] = []

// These options are generated as they match the TW defaults and for our use that is what we need.
// Later make option to override these and output values to pass into TW to match.
const leafCSSProps: GenericObject = {
  spacing,
  font,
  rounded,
}

const mergedEls: Record<string, Record<string, any>> = {
  ...btn,
  ...input,
}

const mergedBase = {
  ...core,
}

const mergedComps = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...drawer,
  ...slideToggle,
}

const mergedInternals = {
  ...mergedComps,
  ...mergedEls,
  ...mergedBase,
}

// Object will hold a ref to these objects. Some local functions depend on it.
// Be mindeful of this.
export const colorClsContainer: any = {
  backgrounds,
  colors,
  tokenBackgrounds,
}
// Local functions also depend on this.
// Be mindeful of this.
let collectedTwProps: string[] = []

// generate CSS for themes.
export async function generateCss(toGenerate: string[] | string = allThemes) {
  try {
    // complete what we can based on internals which is not dependent only particular themes, IE collecting spacing values
    let processedCSS: Result
    let mergedProcessedCSS = ''
    let cssPropsString = ''
    let isTw = false

    // Find which props are being used interally for TW. No need to include them all if TW doesn't use them.
    if (Bun.argv[2] === '--tw') {
      // Build for TW.
      isTw = true

      processedCSS = await postcss().process(
        { ...mergedComps },
        {
          parser: postcssJs.parse,
        },
      )
      mergedProcessedCSS = processedCSS.css

      // See if props are used within the components and elements, otherwise we don't need to include them in our theme for TW purposes.
      const collectedTwSpacingKeys = findPropsFromInternal(spacing, 'spacing', mergedInternals)
      const collectedTwFontKeys = findPropsFromInternal(font, 'font', mergedInternals)
      const collectedTwRoundnessKeys = findPropsFromInternal(rounded, 'rounded', mergedInternals)

      collectedTwProps = [...collectedTwFontKeys, ...collectedTwRoundnessKeys, ...collectedTwSpacingKeys]
    }

    let builtCssPropsString = ''
    let twAppend = ''

    // Generate colors in several contexts for the theme.
    const generateColors = (contrastColorsMap: GenericObject) => {
      const { backgroundsToGen, colorsToGen, textOnToGen, tokensToGen } = cssColorGenerate(
        colorClsContainer,
        derivedColorPropsColl,
        contrastColorsMap,
      )

      colorNames.forEach((colorName: string) => {
        const backgroundsForStops = backgroundsToGen(colorName)
        const colorsForStops = colorsToGen(colorName)
        const textOnToForStops = textOnToGen(colorName)
        const tokensForStops = tokensToGen(colorName)

        let j = stops.length - 1

        stops.forEach((stop) => {
          backgroundsForStops(stop)
          colorsForStops(stop)
          textOnToForStops(stop)
          tokensForStops(stop, j)

          j--
        })
      })
    }

    const processTwTheme = (themeOpts: Theme) => {
      const collectParts = (props: string[][]) => {
        props.forEach((prop: string[], i: any) => {
          const subCollKey = prop[0]
          const subCollModKey = prop[1]
          const subColl = leafCSSProps[subCollKey]

          const concatedVal = `--${subCollKey}-${subCollModKey}: ${subColl[subCollModKey]};`

          if (!collectedTwProps.includes(concatedVal)) {
            collectedTwProps.push(concatedVal)
          }
        })
      }

      const parsedColors = findPropsFromTheme(themeOpts.colors)
      const propsColors = convertMatchesToCamelCasing(parsedColors)

      collectParts(propsColors)

      const parsedGeneral = findPropsFromTheme(themeOpts.general)
      const propsGeneral = convertMatchesToCamelCasing(parsedGeneral)

      collectParts(propsGeneral)

      collectedTwProps.sort()
      return collectedTwProps.join('\n')
    }

    const handleTheme = async (name: string, theme: Theme) => {
      const contrastColorsMap = createContrastColorsMap(theme)

      generateColors(contrastColorsMap)

      const processedCSSThemeColors = await postcss().process(theme.colors, {
        parser: postcssJs.parse,
      })
      const processedCSSThemeGeneral = await postcss().process(theme.general, {
        parser: postcssJs.parse,
      })

      let propsString = ''
      if (isTw) {
        propsString = processTwTheme(theme)
        twAppend = '-tw'

        let mergedForProcessing = {
          ...tokenBackgrounds,
        }

        processedCSS = await postcss().process(mergedForProcessing, {
          parser: postcssJs.parse,
        })

        mergedProcessedCSS += processedCSS.css

        builtCssPropsString = buildThemeProps(true, [
          processedCSSThemeColors.css,
          processedCSSThemeGeneral.css,
          derivedColorPropsColl.join(';\n'),
          propsString,
        ])
      } else {
        // tokenBackgrounds onColor are generated from themes.

        let mergedForProcessing = {
          ...mergedInternals,
          ...backgrounds,
          ...colors,
          ...tokenBackgrounds,
        }

        processedCSS = await postcss().process(mergedForProcessing, {
          parser: postcssJs.parse,
        })

        mergedProcessedCSS = processedCSS.css

        cssPropsString = objectsToCSSProperties(leafCSSProps)
        propsString = cssPropsString

        builtCssPropsString = buildThemeProps(false, [
          processedCSSThemeColors.css,
          processedCSSThemeGeneral.css,
          derivedColorPropsColl.join(';\n'),
          propsString,
        ])
      }

      const processedProps = await prettier.format(builtCssPropsString, {
        parser: 'css',
      })

      const minifiedMergedCSS = new CleanCSS().minify(mergedProcessedCSS)

      const finalCSS = processedProps + minifiedMergedCSS.styles

      await Bun.write(`${CSS_DIST_ROOT}theme-${name}${twAppend}.css`, finalCSS)
    }

    try {
      if (Array.isArray(toGenerate)) {
        await Promise.all(
          toGenerate.map(async (themeName: string) => {
            const { name, theme } = themes[themeName]

            await handleTheme(name, theme)

            return true
          }),
        )
      } else {
        const { name, theme } = themes[toGenerate]

        await handleTheme(name, theme)

        return true
      }
    } catch (error) {
      console.error('Error occurred:', error)
      // If an error occurred, return false
      return false
    }
  } catch (error) {
    console.error('Error occurred:', error)
  }
}

;(async () => {
  await generateCss(allThemes)
})()

export function twPlugin({ addBase, addComponents }: { addBase: any; addComponents: any }) {
  // Add Leaf Elements as components to Tailwind.
  addBase(mergedBase)
  addComponents({ ...mergedEls })
}

export function twBasePlugin({ addBase }: { addBase: any }) {
  addBase(mergedBase)
}
