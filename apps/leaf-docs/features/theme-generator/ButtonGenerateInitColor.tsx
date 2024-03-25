import { leafColors } from './composed/leafColors'

interface Props {
  generateInitColors: (str: string) => void
}

export default function ButtonGenerateInitColor({ generateInitColors }: Props) {
  const handleClick = () => {
    const result = leafColors.generateRandomHex()
    if (result.success && result.result) {
      generateInitColors(result.result)
    } else {
      generateInitColors('')
    }
  }

  return (
    <div>
      <button className="button-el" onClick={handleClick}>
        Random Color
      </button>
    </div>
  )
}
