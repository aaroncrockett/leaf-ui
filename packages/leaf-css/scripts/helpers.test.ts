import { expect, test } from 'bun:test'
// Types
import { findPropsFromInternal, objectToCSSProperties } from './helpers.ts'
// Data
import { accordion } from '../styles/components/accordion.js'
import { appRail } from '../styles/components/app-rail.js'
import { appShell } from '../styles/components/app-shell.js'
import { btn } from '../styles/elements/btn.js'
import { drawer } from '../styles/components/drawer.js'
import { input } from '../styles/elements/input.js'
import { slideToggle } from '../styles/components/slide-toggle.js'

const mocProps = {
  16: '4rem',
  1.5: '0.375rem',
  px: '1px',
  0: '0px',
  0.5: '0.125rem',
  7: '1.75rem',
}

const mocTokens = {
  roundness: '--rounded-md',
  'btn-roundness': '--rounded-full',
  'input-roundness': '--rounded-full',
}

const mergedCSSInJsCompsForTW = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...drawer,
  ...slideToggle,
}

const mergeCSSInJSCompsAndElementsForTw = {
  ...mergedCSSInJsCompsForTW,
  ...btn,
  ...input,
}

// Test objectToCSSProperties
test('objectToCSSProperties function with Moc Tokens', () => {
  const prefix = 'ui'
  const varWrap = true

  const result = objectToCSSProperties(prefix, mocTokens, varWrap)

  // Check the entire output string
  expect(result).toBe(
    ' --ui-roundness: var(--rounded-md);\n --ui-btn-roundness: var(--rounded-full);\n --ui-input-roundness: var(--rounded-full);\n',
  )
})

test('objectToCSSProperties function with mocProps', () => {
  const prefix = 'size'
  const varWrap = false

  const result = objectToCSSProperties(prefix, mocProps, varWrap)

  // Check the entire output string
  expect(result).toBe(
    ' --size-0: 0px;\n --size-7: 1.75rem;\n --size-16: 4rem;\n --size-1pt5: 0.375rem;\n --size-px: 1px;\n --size-0pt5: 0.125rem;\n',
  )
})

// Test findPropsFromInternal
test('findPropsFromInternal function', () => {
  const result = findPropsFromInternal(mocProps, 'spacing', mergeCSSInJSCompsAndElementsForTw)
  expect(result).toContain('--spacing-7: 1.75rem;')
  expect(result).toContain('--spacing-16: 4rem;')
  expect(result.some((key: string) => key.startsWith('--spacing-77:'))).toBeFalsy()
  expect(result.some((key: string) => key.startsWith('--spacing-1:'))).toBeFalsy()
  expect(result.some((key: string) => key.startsWith('-spacing-16:'))).toBeFalsy()
})
