import React, { useState } from 'react'
import { stopsWBase } from '../../settings/global'
import { HEX_LENGTH, steppedSwatchColorClasses } from './settings/index'

import { replaceAllDblHashes } from '@/utils/index'

import clsx from 'clsx'

interface Props {
  color: any
  singleColorChange: (key: string, hex: string) => void
}
export default function ColorRow({ color: color, singleColorChange }: Props) {
  const [colorHex, setColorHex] = useState(color.hex)
  const swatchSingleColorChange = (hex: string) => {
    setColorHex(hex)

    singleColorChange(color.key, hex)
  }
  const getTwColorClass = (key: string, stop: string) => {
    return steppedSwatchColorClasses[key][stop]
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    const newValue = !value.startsWith('#') ? `#${value}` : replaceAllDblHashes(value)
    setColorHex(newValue)
    singleColorChange(color.key, newValue)
  }

  return (
    <div className="grid grid-cols-11">
      <input onChange={handleOnChange} className="input-el" type="text" placeholder="#cccccc" value={colorHex} />
      {stopsWBase.map((stop, index) => {
        return (
          <div className="flex flex-col" key={index}>
            <span className="flex whitespace-nowrap justify-center">{stop}</span>
            <span className={clsx(getTwColorClass(color.key, stop), 'w-full h-6')}>{colorHex}</span>
          </div>
        )
      })}

      <div>post</div>
    </div>
  )
}
