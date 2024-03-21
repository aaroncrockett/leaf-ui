import AppRail from 'leaf-react/lib/AppRail'
import RailToggle from 'leaf-react/lib/AppRail/RailToggle.jsx'
// React
import { useState } from 'react'

export default function SidebarLeft() {
  // closure
  const [railValue, setRailValue] = useState('a')
  const toggleCb = (value) => {
    setRailValue(value)
  }
  return (
    <div className="bg-neutral/20 flex flex-row">
      <AppRail toggleCb={toggleCb}>
        <RailToggle radioGroup="group" radioValue="a" text="Menu A" />
        <RailToggle radioGroup="group" radioValue="b" text="Menu B" />
      </AppRail>
      <span> {railValue} upasdf</span>

      {railValue === 'a' && (
        <div>
          <p>menu A</p>
        </div>
      )}
      {railValue === 'b' && (
        <div>
          <p>menu B</p>
        </div>
      )}
    </div>
  )
}
