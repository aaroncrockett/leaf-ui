export interface ThemeInfo {
  theme: Theme
  name: string
}

export interface Theme {
  colors: { [key: string]: string }
  general: { [key: string]: string }
  name: string
}
