// React
import React from 'react'
import { useCallback, useEffect, useState, useRef } from 'react'
// Local settings, composed, helpers
import { type ColorData } from './settings/index'
import { leafColors } from './composed/leafColors'
import { createInitialThemeColors, generateColorScheme } from './helpers'
//
import ButtonGenerateInitColor from './ButtonGenerateInitColor'
import Heading from './Heading'
import InputGenerateInitColor from './InputGenerateInitColor'
import ColorRow from './ColorRow'

function ThemeGenerator() {
  const [data, setData] = useState<ColorData[]>([])
  const [colorScheme, setColorScheme] = useState('triad')
  const [primaryHex, setPrimaryHex] = useState('')

  const renderCount = useRef(0)

  // For collecting data without rerendering.
  const tempData = useRef<ColorData[]>([])

  // Hold data and update the DOM.

  const updateTempData = (newData: Record<string, string>, index: number) => {
    tempData.current[index] = { ...tempData.current[index], ...newData }
  }

  const setTempData = (newData: ColorData[]) => {
    tempData.current = newData
  }

  const setColorData = (data: ColorData[]) => {
    setData(data)
    tempData.current = data
  }

  const singleColorChange = (key: string, hex: string) => {
    const index = tempData.current.findIndex((color) => color.key === key)

    updateTempData({ hex: hex }, index)

    console.log(tempData.current)
  }

  const generateInitColors = useCallback(
    (colorHex: string) => {
      const colors = generateColorScheme(colorScheme, colorHex)

      if (colors.length) {
        setPrimaryHex(colorHex)
        setColorData(createInitialThemeColors(colors))
      } else {
        setPrimaryHex('')
        setColorData([])
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
        <ColorRow key={color.key} color={color} singleColorChange={singleColorChange} />
      ))}
    </div>
  )
}

export default ThemeGenerator
