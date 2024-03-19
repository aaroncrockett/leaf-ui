// There is a a git hub issue to clean this code up. Specifically the CSS transitions/isOpened logic. It is important we do so. #83. Please read the issue before addresing this code.

module.exports = {
  drawer: {
    // backdrop and backdrop options.
    '.l3f__drawer-backdrop': {
      position: 'fixed',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      'justify-content': 'start',
      width: '0',
      transition: 'background-color .5s',
    },
    '.l3f__drawer-backdrop.l3f_drawer-backdrop-opts': {
      'z-index': '40',
    },
    // opened backdrop
    '.l3f_opened.l3f__drawer-backdrop': {
      width: '100%',
      opacity: 1,
    },
    // transition opacity while drawer is closing, before abruptly setting grid-template-rows to 0.
    '.l3f_opened.l3f_closing.l3f__drawer-backdrop': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    // drawer
    '.l3f__drawer-backdrop .l3f_drawer': {
      background: 'white',
      'overflow-y': 'auto',
      transition: 'transform .5s',
    },
    // drawer positions, define closed position for each
    // finish, right, top and bottom.
    '.l3f__drawer-backdrop.l3f_drawer-left': {
      height: '100%',
    },
    '.l3f__drawer-backdrop.l3f_drawer-right': {
      height: '100%',
    },
    '.l3f__drawer-backdrop.l3f_drawer-left .l3f_drawer': {
      transform: 'translateX(-100%)',
      width: '90%',
      height: '100%',
      borderRadius: '0 var(--ui-roundness) var(--ui-roundness) 0',
    },
    // drawer positions, define  opened position for each
    // finish, right, top and bottom.
    '.l3f_opened.l3f__drawer-backdrop.l3f_drawer-left .l3f_drawer': {
      transform: 'translateX(0)',
    },
    // drawer positions, define transition from opened to close for each
    // this is an intermediate state that transitions the drawer prior to setting CSS grid-temlate-rows to 0.
    '.l3f_opened.l3f_closing.l3f__drawer-backdrop.l3f_drawer-left .l3f_drawer': {
      transform: 'translateX(-100%)',
    },

    // previous commented out code for reference only. Address this in issue #83
    //  .l3f_drawer-top': {
    //   'align-items': 'start',
    //   width: '100%',
    //   height: '50%',
    //   borderRadius: 'var(--ui-roundness) var(--ui-roundness) 0 0',
    // },
    // '.l3f__drawer-backdrop .l3f_drawer-bottom': {
    //   'align-items': 'end',
    //   width: '100%',
    //   height: '50%',
    //   borderRadius: '0 0 var(--ui-roundness) var(--ui-roundness)',
    // },
    // '.l3f__drawer-backdrop .l3f_drawer-right': {
    //   'justify-content': 'end',
    //   width: '90%',
    //   height: '100%',
    //   borderRadius: 'var(--ui-roundness) 0 0 var(--ui-roundness)',
    // },
  },
}
