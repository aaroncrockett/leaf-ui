module.exports = {
  appShell: {
    '.l3f__app-shell': {
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
    },
    '.l3f__app-shell .l3f_site-header': {
      display: 'flex',
      position: 'sticky',
      top: 0,
    },
    '.l3f__app-shell .l3f_site-header-opts': {
      zIndex: 10,
    },
    '.l3f__app-shell .l3f_site-central-wrapper': {
      display: 'flex',
      flex: 'auto',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    '.l3f__app-shell .l3f_site-sidebar-left': {
      display: 'flex',
      flex: 'none',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    '.l3f__app-shell .l3f_site-sidebar-left-opts': {
      width: 'auto',
    },
    '.l3f__app-shell .l3f_site-sitebar-right': {
      display: 'flex',
      flex: 'none',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    '.l3f__app-shell .l3f_site-sidebar-right-opts': {
      width: 'auto',
    },
    '.l3f__app-shell .l3f_page': {
      display: 'flex',
      'flex-direction': 'column',
      flex: 1,
      overflowY: 'scroll',
      overflowX: 'hidden',
    },
    '.l3f__app-shell .l3f_page-main': {
      display: 'flex',
      flex: 'none',
    },
    '.l3f__app-shell .l3f_page-header': {
      display: 'flex',
      flex: 'none',
    },
    '.l3f__app-shell .l3f_page-footer': {
      display: 'flex',
      flex: 'none',
    },
    '.l3f__app-shell .l3f_site-footer': {
      display: 'flex',
      flex: 'none',
    },
  },
}
