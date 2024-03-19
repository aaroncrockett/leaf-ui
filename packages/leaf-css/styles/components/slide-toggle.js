module.exports = {
  slideToggle: {
    '.l3f__slide-toggle': {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 'var(--ui-input-roundness)',
    },
    '.l3f__slide-toggle .l3f_track': {
      cursor: 'pointer',
      display: 'flex',
      borderRadius: '1000px',
    },
    '.l3f__slide-toggle .l3f_track-xl': {
      width: 'var(--spacing-16)',
      height: 'var(--spacing-8)',
    },
    '.l3f__slide-toggle .l3f_track-large': {
      width: 'var(--spacing-14)',
      height: 'var(--spacing-7)',
    },
    '.l3f__slide-toggle .l3f_track-medium': {
      width: 'var(--spacing-12)',
      height: 'var(--spacing-6)',
    },
    '.l3f__slide-toggle .l3f_track-small': {
      width: 'var(--spacing-10)',
      height: 'var(--spacing-5)',
    },
    '.l3f__slide-toggle .l3f_thumb': {
      display: 'inline-block',
      borderRadius: '1000px',
      width: '50%',
      height: '100%',
      transform: 'scale(0.8)',
      transition: 'all 0.2s ease-in-out',
    },
    '.l3f__slide-toggle .l3f_is-toggle-on': {
      transform: 'translateX(100%) scale(0.8)',
    },
  },
}
