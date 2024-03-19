import React from 'react'

import AppRailProvider from './AppRailProvider'

export default function AppRail({
  toggleCb,
  Tail,
  Lead,
  appRailCls = 'l3f__app-rail l3f_app-rail-opts neutral-100-900-token',
  activeTokenClass = '',
  regionLeadCls = '',
  regionDefaultCls = '',
  regionTailCls = '',
  children,
}) {
  return (
    <AppRailProvider activeTokenClass={activeTokenClass} appRailCls={appRailCls} toggleCb={toggleCb}>
      {Lead && <div className={regionLeadCls}> {Lead} </div>}
      <div className={regionDefaultCls}>{children}</div>
      {Tail && <div className={regionTailCls}> {Tail} </div>}
    </AppRailProvider>
  )
}
