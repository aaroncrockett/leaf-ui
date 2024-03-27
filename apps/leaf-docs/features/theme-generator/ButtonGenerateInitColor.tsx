import { leafColors } from './composed/leafColors'
import UiButton from 'leaf-react/lib/UiButton'

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

  return <UiButton text="Random Color" className="ui-button" onClick={handleClick} />
}
