import { render } from '@testing-library/vue'
import { test, expect } from 'vitest'

import LeafAppRail from './LeafAppRail.vue'

/**
 * @vitest-environment jsdom
 */

test('LeafAppRail renders without throwing', () => {
  expect(() => render(LeafAppRail)).not.toThrow()
})
