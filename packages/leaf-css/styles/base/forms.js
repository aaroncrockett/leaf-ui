module.exports = {
  forms: {
    'fieldset, legend, label': {
      display: 'block',
    },
    'input::-webkit-calendar-picker-indicator': {
      filter: 'invert(1)',
    },
    "input[type='search']::-webkit-search-cancel-button": {
      WebkitAppearance: 'none',
      background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z'/%3E%3C/svg%3E") no-repeat 50% 50%`,
      width: 'var(--spacing-4)',
      height: 'var(--spacing-4)',
      backgroundSize: 'contain',
      borderRadius: '50%',
      opacity: '0',
      pointerEvents: 'none',
    },
    "input[type='search']:focus::-webkit-search-cancel-button": {
      opacity: '1',
      pointerEvents: 'auto',
    },
    "input[type='search']::-webkit-search-cancel-button": {
      filter: 'invert(1)',
    },
    progress: {
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
      width: '100%',
      height: 'var(--spacing-2)',
      overflow: 'hidden',
      borderRadius: 'var(--ui-rounded)',
    },
    ':indeterminate::-moz-progress-bar': {
      width: '0',
    },
  },
}
