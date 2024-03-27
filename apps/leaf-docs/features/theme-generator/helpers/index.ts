import { leafColors, type LeafColorResult } from '../composed/leafColors'
import { capitalizeFirstLetter } from '@utils/index'
import { colorData, ColorData } from '../settings/index'

export const createInitialThemeColors = (colors: { name: string; value: string }[]): ColorData[] => {
  const colorColl = colors.map((color): ColorData => {
    return {
      ...colorData,
      key: color.name,
      label: capitalizeFirstLetter(color.name),
      hex: color.value,
    }
  })
  return colorColl
}

export const createGetColorScheme = (leafColors: any) =>
  // Func: getColorScheme
  function (scheme: string, base: string) {
    let result: LeafColorResult = {}
    let results: any[] = []
    if (!base) {
      return results
    }
    switch (scheme) {
      case 'triad':
        result = leafColors.generateTriadColors(base)

        if ('errorMsg' in result) {
          console.error(result.errorMsg)
        } else if (result.data && Array.isArray(result.data)) {
          results = [
            { name: 'primary', value: base },
            { name: 'secondary', value: result?.data[0] },
            { name: 'tertiary', value: result?.data[1] },
          ]
        }

        break
      case 'analogous':
        break

      case 'complementary':
        break

      default:
        break
    }
    return results
  }

export const getColorScheme = createGetColorScheme(leafColors)
