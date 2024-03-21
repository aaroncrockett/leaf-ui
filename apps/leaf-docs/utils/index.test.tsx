import { expect, test } from 'bun:test'
import { capitalizeFirstLetter, reduceFuncs, replaceAllDblHashes } from './index'

test('reduceFuncs functionality', () => {
  function one(obj: any) {
    return function () {
      return 'hi'
    }
  }

  function two(obj: any) {
    return function () {
      return 'sup'
    }
  }

  const funcs = [one, two]
  const args = [{ lib: null }]

  const answer = reduceFuncs(funcs, args)

  expect(answer).toHaveProperty('one')
  expect(answer).toHaveProperty('two')
  expect(answer.two()).toBe('sup')
})

test('capitalizeFirstLatter functionality', () => {
  const hello = capitalizeFirstLetter('hello')
  expect(hello).toBe('Hello')
  const hi = capitalizeFirstLetter('hi')
  expect(hi).toBe('Hi')
  const h = capitalizeFirstLetter('h')
  expect(h).toBe('H')
})

test('replace all double hashes', () => {
  const str1 = '##Hello##World##'
  const result1 = replaceAllDblHashes(str1)
  expect(result1).toBe('#Hello#World#')

  const str2 = 'No hashes here'
  const result2 = replaceAllDblHashes(str2)
  expect(result2).toBe('No hashes here')

  const str3 = '######'
  const result3 = replaceAllDblHashes(str3)
  expect(result3).toBe('###')
})
