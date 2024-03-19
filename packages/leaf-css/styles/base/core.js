module.exports = {
  core: {
    body: {
      fontSize: 'var(--font-md)',
    },
    '::selection': {
      backgroundColor: 'rgb(var(--color-primary-500)) / 0.5',
    },
    '::-webkit-scrollbar': {
      width: 'var(--spacing-2)',
      height: 'var(--spacing-2)',
    },
    '::-webkit-scrollbar-track': {
      padding: 'var(--spacing-0) var(--spacing-px)',
    },
  },
}
