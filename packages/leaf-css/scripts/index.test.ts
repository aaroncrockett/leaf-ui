// Test imports
import { expect, test } from 'bun:test'

import { readFileSync } from 'fs'
import { resolve } from 'path'

const FILE_PATH_ROOT = resolve(__dirname, '../dist/themes/')

test('Check if expected strings exist in theme-leaf.css', () => {
  // Read the file
  const filePath = resolve(FILE_PATH_ROOT, 'theme-leaf.css')
  const fileContent = readFileSync(filePath, 'utf-8')

  // Check if the string exists in the file content

  expect(fileContent).toContain('--spacing-0: 0px;')
  expect(fileContent).toContain('--spacing-0pt5: 0.125rem;')
  expect(fileContent).toContain('--spacing-unit-pt: 0.125;')
  expect(fileContent).toContain('--spacing-unit: 1;')
  expect(fileContent).toContain('--btn-font-sm-size: var(--font-sm);')
  expect(fileContent).toContain('primary-100-900-token')
  expect(fileContent).toContain('bg-primary')
  expect(fileContent).toContain('.primary-token')
})

test('Check if expected strings exist in theme-leaf.css', () => {
  // Read the file
  const filePath = resolve(FILE_PATH_ROOT, 'theme-leaf-tw.css')
  const fileContent = readFileSync(filePath, 'utf-8')

  // Check if the string exists in the file content

  expect(fileContent).toContain('--btn-font-sm-size: var(--font-sm);')
  expect(fileContent).toContain('.primary-100-900-token')
  expect(fileContent).toContain('.primary-token')
})
