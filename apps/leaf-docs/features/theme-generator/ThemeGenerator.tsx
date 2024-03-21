// React
import { useCallback, useEffect, useState, useRef } from 'react'
// Local settings, composed, helpers
import { type ColorData } from './settings/index'
import { leafColors } from './composed/leafColors'
import { createInitialThemeColors, generateColorScheme } from './helpers'
//
import ButtonGenerateInitColor from './ButtonGenerateInitColor'
import Heading from './Heading'
import InputGenerateInitColor from './InputGenerateInitColor'

function ThemeGenerator() {
  const [data, setData] = useState<ColorData[]>([])
  const [colorScheme, setColorScheme] = useState('triad')
  const [primaryHex, setPrimaryHex] = useState('')

  const renderCount = useRef(0)

  // For collecting data without rerendering.
  const tempData = useRef<ColorData[]>([])

  // To use data collection to update the DOM.
  const swapData = () => {
    setData(tempData.current)
    tempData.current = []
  }
  const updateTempData = (newData: Record<string, string>, index: number) => {
    tempData.current[index] = { ...tempData.current[index], ...newData }
  }

  const setTempData = (newData: ColorData[]) => {
    tempData.current = newData
  }

  const generateInitColors = useCallback(
    (colorHex: string) => {
      const colors = generateColorScheme(colorScheme, colorHex)

      if (colors.length) {
        setPrimaryHex(colorHex)
        setTempData(createInitialThemeColors(colors))
        swapData()
      } else {
        setPrimaryHex('')
        setTempData([])
        swapData()
      }
    },
    [colorScheme],
  )

  useEffect(() => {
    const result = leafColors.generateRandomHex()

    if (result.success && result.result) {
      generateInitColors(result.result)
    }
  }, [generateInitColors])

  useEffect(() => {
    renderCount.current++
  })

  return (
    <div className="relative">
      <div className="absolute top-0 right-0">Count: {renderCount.current}</div>
      <Heading />
      <ButtonGenerateInitColor generateInitColors={generateInitColors} />
      <InputGenerateInitColor color={primaryHex} generateInitColors={generateInitColors} />
      {data.map((color, index) => (
        <div key={index}>
          {color.label} {color.hex}
        </div>
      ))}
    </div>
  )
}

export default ThemeGenerator
