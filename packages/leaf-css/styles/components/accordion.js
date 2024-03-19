// url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>")

module.exports = {
  accordion: {
    '.l3f__accordion-wrapper .l3f_accordion': {
      display: 'flex',
      'flex-direction': 'column',
      width: '100%',
    },
    '.l3f__accordion-wrapper .l3f_accordion-header': {
      display: 'flex',
      'justify-content': 'space-between',
      width: '100%',
      padding: 'var(--el-p-base)',
    },
    '.l3f__accordion-wrapper .l3f_header-control': {
      padding: 'var(--el-p-base)',
      'background-image':
        'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>\')',
      height: '24px',
      width: '24px',
      'background-repeat': 'no-repeat',
      'background-position': 'right var(--el-sm) center',
      'background-size': 'var(--el-p-triple)',
      padding: 'var(--el-p-base) var(--el-p-double)',
      transition: 'transform 0.5s ease-in-out',
    },
    '.l3f__accordion-wrapper .opened .l3f_header-control': {
      transform: 'rotate(-90deg)',
    },
    '.l3f__accordion-wrapper .l3f_accordion-section-wrapper': {
      display: 'grid',
      'grid-template-rows': '0fr',
      transition: 'all 0.5s ease-in-out',
      width: 'calc(100% - (var(--el-p-base) * 4))',
      margin: '0 auto',
      opacity: '0',
    },
    '.l3f__accordion-wrapper .opened .l3f_accordion-section-wrapper': {
      'grid-template-rows': '1fr',
      'padding-top': 'var(--el-p-base)',
      'padding-bottom': 'var(--el-p-base)',
      opacity: '1',
    },
    '.l3f__accordion-wrapper .l3f_accordion-section': {
      overflow: 'hidden',
    },
  },
}
