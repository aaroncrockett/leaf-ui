import { leafColors } from './composed/leafColors'

interface Props {
  generateInitColors: (str: string) => void
}

export default function ButtonGenerateInitColor({ generateInitColors }: Props) {
  const handleClick = () => {
    const result = leafColors.generateRandomHex()
    if ('errorMsg' in result) {
      console.error(result.errorMsg)
      generateInitColors('')
    } else {
      generateInitColors(result.data)
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
