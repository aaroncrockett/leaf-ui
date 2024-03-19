module.exports = {
  appRail: {
    /* Base styles */
    '.l3f__app-rail': {
      display: 'grid',
      'grid-template-rows': 'auto 1fr auto',
      'overflow-y': 'auto',
      height: '100%',
    },
    '.l3f__app-rail.l3f_app-rail-opts': {
      width: 'var(--spacing-20)',
    },
    /* Region Styles */
    '.l3f__app-rail .l3f_app-rail-region-lead, .l3f__app-rail .l3f_app-rail-region-default, .l3f__app-rail .l3f_app-rail-region-tail':
      {
        'box-sizing': 'border-box',
      },
    /* Item and Item Wrapper Styles */
    '.l3f__app-rail .l3f_rail-toggle-wrapper': {
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'stretch',
      width: '100%',
      cursor: 'pointer',
    },
    '.l3f__app-rail .l3f_rail-toggle-wrapper-opts': {
      'aspect-ratio': '1',
      'text-align': 'center',
      fontSize: 'var(--font-sm)',
      background: 'var(--active-bg)',
    },
    '.l3f__app-rail .l3f_rail-toggle-wrapper-opts': {
      'aspect-ratio': '1',
      'text-align': 'center',
      fontSize: 'var(--font-sm)',
    },
    '.l3f__app-rail .active-bg': {
      background: 'var(--active-bg)',
    },
    '.l3f__app-rail .l3f_rail-toggle-text-wrapper': {
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'center',
      height: '100%',
    },
    '.l3f__app-rail .l3f_rail-item': {
      height: '100%',
      display: 'flex',
      'flex-direction': 'column',
    },
    '.l3f__app-rail .l3f_rail-item-opts': {
      padding: 'var(--el-sm)',
    },
    /* Label Styles */
    '.l3f__app-rail .l3f_rail-label': {
      'padding-top': 'var(--el-sm)',
    },
    /* Inner styles with no provided classes props. Not meant to be adjusted.
    /* Radio button for keeping track of selected */
    '.l3f__app-rail .hidden-radio': {
      overflow: 'hidden',
      width: '0px',
      height: '0px',
    },
  },
}
