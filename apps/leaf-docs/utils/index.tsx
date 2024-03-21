export function reduceFuncs(funcs: any, args: any[]) {
  return funcs.reduce(
    (acc: any, func: any) => {
      const funcName = func.name

      const returnedFunc = func(...args)
      acc[funcName] = returnedFunc
      return acc
    },
    {} as Record<string, any>,
  )
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function debounce(func: any, delay: number) {
  let timer: ReturnType<typeof setTimeout>

  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export function replaceAllDblHashes(str: string) {
  return str.replaceAll('##', '#')
}
