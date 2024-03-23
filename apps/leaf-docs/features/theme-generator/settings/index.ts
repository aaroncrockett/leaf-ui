export const HEX_LENGTH = 7
export const colorData = { key: '', label: '', hex: '', rgb: '', on: '' } as const

export interface ColorData {
  key: string
  label: string
  hex: string
  rgb: string
  on: string
}

export const steppedSwatchColorClasses: Record<string, Record<string, string>> = {
  primary: {
    '100': 'bg-primary-100',
    '200': 'bg-primary-200',
    '300': 'bg-primary-300',
    '400': 'bg-primary-400',
    base: 'bg-primary',
    '600': 'bg-primary-600',
    '700': 'bg-primary-700',
    '800': 'bg-primary-800',
    '900': 'bg-primary-900',
  },
  secondary: {
    '100': 'bg-secondary-100',
    '200': 'bg-secondary-200',
    '300': 'bg-secondary-300',
    '400': 'bg-secondary-400',
    base: 'bg-secondary',
    '600': 'bg-secondary-600',
    '700': 'bg-secondary-700',
    '800': 'bg-secondary-800',
    '900': 'bg-secondary-900',
  },
  tertiary: {
    '100': 'bg-tertiary-100',
    '200': 'bg-tertiary-200',
    '300': 'bg-tertiary-300',
    '400': 'bg-tertiary-400',
    base: 'bg-tertiary',
    '600': 'bg-tertiary-600',
    '700': 'bg-tertiary-700',
    '800': 'bg-tertiary-800',
    '900': 'bg-tertiary-900',
  },
  success: {
    '100': 'bg-success-100',
    '200': 'bg-success-200',
    '300': 'bg-success-300',
    '400': 'bg-success-400',
    base: 'bg-success',
    '600': 'bg-success-600',
    '700': 'bg-success-700',
    '800': 'bg-success-800',
    '900': 'bg-success-900',
  },
  warning: {
    '100': 'bg-warning-100',
    '200': 'bg-warning-200',
    '300': 'bg-warning-300',
    '400': 'bg-warning-400',
    base: 'bg-warning',
    '600': 'bg-warning-600',
    '700': 'bg-warning-700',
    '800': 'bg-warning-800',
    '900': 'bg-warning-900',
  },
  error: {
    '100': 'bg-error-100',
    '200': 'bg-error-200',
    '300': 'bg-error-300',
    '400': 'bg-error-400',
    base: 'bg-error',
    '600': 'bg-error-600',
    '700': 'bg-error-700',
    '800': 'bg-error-800',
    '900': 'bg-error-900',
  },
  neutral: {
    '100': 'bg-neutral-100',
    '200': 'bg-neutral-200',
    '300': 'bg-neutral-300',
    '400': 'bg-neutral-400',
    base: 'bg-neutral',
    '600': 'bg-neutral-600',
    '700': 'bg-neutral-700',
    '800': 'bg-neutral-800',
    '900': 'bg-neutral-900',
  },
}
