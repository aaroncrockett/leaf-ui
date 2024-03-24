export const HEX_LENGTH = 7
export const colorData = { key: '', label: '', hex: '', rgb: '', on: '' } as const
import { colorNames, stopsWBase } from '../../../settings/global'

export interface ColorData {
  key: string
  label: string
  hex: string
  rgb: string
  on: string
}

// ideally we would do something like this, but the tw classes can't be dynamically created and this is breaking them.
// colorNames.forEach((colorName) => {
//   steppedSwatchColorClasses[colorName] = {}
//   stopsWBase.forEach((stop) => {
//     steppedSwatchColorClasses[colorName][stop] = stop === 'base' ? `bg-${colorName}` : `bg-${colorName}-${stop}`
//   })
// })

export const steppedSwatchColorClasses: Record<string, Record<string, string>> = {
  primary: {
    '50': 'bg-primary-50',
    '100': 'bg-primary-100',
    '200': 'bg-primary-200',
    '300': 'bg-primary-300',
    '400': 'bg-primary-400',
    base: 'bg-primary',
    '600': 'bg-primary-600',
    '700': 'bg-primary-700',
    '800': 'bg-primary-800',
    '900': 'bg-primary-900',
    '950': 'bg-primary-950',
  },
  secondary: {
    '50': 'bg-secondary-50',
    '100': 'bg-secondary-100',
    '200': 'bg-secondary-200',
    '300': 'bg-secondary-300',
    '400': 'bg-secondary-400',
    base: 'bg-secondary',
    '600': 'bg-secondary-600',
    '700': 'bg-secondary-700',
    '800': 'bg-secondary-800',
    '900': 'bg-secondary-900',
    '950': 'bg-secondary-950',
  },
  tertiary: {
    '50': 'bg-tertiary-50',
    '100': 'bg-tertiary-100',
    '200': 'bg-tertiary-200',
    '300': 'bg-tertiary-300',
    '400': 'bg-tertiary-400',
    base: 'bg-tertiary',
    '600': 'bg-tertiary-600',
    '700': 'bg-tertiary-700',
    '800': 'bg-tertiary-800',
    '900': 'bg-tertiary-900',
    '950': 'bg-tertiary-950',
  },
  success: {
    '50': 'bg-success-50',
    '100': 'bg-success-100',
    '200': 'bg-success-200',
    '300': 'bg-success-300',
    '400': 'bg-success-400',
    base: 'bg-success',
    '600': 'bg-success-600',
    '700': 'bg-success-700',
    '800': 'bg-success-800',
    '900': 'bg-success-900',
    '950': 'bg-tertiary-950',
  },
  warning: {
    '50': 'bg-warning-50',
    '100': 'bg-warning-100',
    '200': 'bg-warning-200',
    '300': 'bg-warning-300',
    '400': 'bg-warning-400',
    base: 'bg-warning',
    '600': 'bg-warning-600',
    '700': 'bg-warning-700',
    '800': 'bg-warning-800',
    '900': 'bg-warning-900',
    '950': 'bg-warning-950',
  },
  error: {
    '50': 'bg-error-50',
    '100': 'bg-error-100',
    '200': 'bg-error-200',
    '300': 'bg-error-300',
    '400': 'bg-error-400',
    base: 'bg-error',
    '600': 'bg-error-600',
    '700': 'bg-error-700',
    '800': 'bg-error-800',
    '900': 'bg-error-900',
    '950': 'bg-error-950',
  },
  neutral: {
    '50': 'bg-neutral-50',
    '100': 'bg-neutral-100',
    '200': 'bg-neutral-200',
    '300': 'bg-neutral-300',
    '400': 'bg-neutral-400',
    base: 'bg-neutral',
    '600': 'bg-neutral-600',
    '700': 'bg-neutral-700',
    '800': 'bg-neutral-800',
    '900': 'bg-neutral-900',
    '950': 'bg-neutral-950',
  },
}
