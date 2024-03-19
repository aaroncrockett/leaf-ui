export function camelToKebab(camelCase: string): string {
  return camelCase.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getContrastYIQ(r: number, g: number, b: number) {
  let yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}

// ** functions past here depend on other utils ** //

// Takes an array and capitalizes each word except the first. Returns a single camel-cased string.
export function reduceToCamelCasingValue(parts: string[]) {
  return parts.reduce((acc: string, curr: string) => acc + capitalizeFirstLetter(curr))
}
