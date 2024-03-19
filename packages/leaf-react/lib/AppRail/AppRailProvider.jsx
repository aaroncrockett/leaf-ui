import React, { createContext, useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

export const AppRailContext = createContext()

export default function AppRailProvider({ children, toggleCb, appRailCls }) {
  const [selectedValue, setSelectedValue] = useState(false)

  return (
    <AppRailContext.Provider value={{ selectedValue, setSelectedValue, toggleCb }}>
      <div className={appRailCls}>{children}</div>
    </AppRailContext.Provider>
  )
}
