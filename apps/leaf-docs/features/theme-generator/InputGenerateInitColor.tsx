import React from 'react'
import { useEffect, useMemo, useState } from 'react'
// Settings and utils
import { HEX_LENGTH } from './settings'
import { debounce, replaceAllDblHashes } from '@/utils'

interface Props {
  generateInitColors: (color: string) => void
  color: string
}

export default function InputGenerateInitColor({ generateInitColors, color: initialColor }: Props) {
  const [warnMsg, setWarnMsg] = useState('')
  const [color, setColor] = useState(initialColor)

  // probably not actually needed here, but as an example of what I have had to do.
  const debouncedGenerateInitColors = useMemo(() => {
    return debounce(generateInitColors, 350)
  }, [generateInitColors])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    const newValue = !value.startsWith('#') ? `#${value}` : replaceAllDblHashes(value)

    setColor(newValue)
    if (newValue.length > HEX_LENGTH) {
      setWarnMsg('There are too many characters in your hex value')
    } else if (newValue.length === HEX_LENGTH) {
      setWarnMsg('')

      debouncedGenerateInitColors(newValue)
    }
  }

  useEffect(() => {
    setColor(initialColor)
  }, [initialColor])

  return (
    <div>
      {warnMsg && <p>{warnMsg}</p>}
      <input onChange={handleOnChange} className="input-el" type="text" placeholder="#cccccc" value={color} />
    </div>
  )
}
