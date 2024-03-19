import { useContext } from 'react'
import { AppRailContext } from './AppRailProvider.jsx'
import clsx from 'clsx'

export default function RailToggle({
  radioGroup,
  radioValue,
  el = null,
  text = '',
  ariaLabel = '',
  railTileWrapperCls = 'l3f_rail-toggle-wrapper l3f_rail-toggle-wrapper-opts neutral-300-700-token',
  railTileInputCls = '',
  railTileTextWrapperCls = 'l3f_rail-toggle-text-wrapper',
}) {
  const railContext = useContext(AppRailContext)

  const railTileInputCombinedCls = clsx('hidden-radio', railTileInputCls)

  const railTileWrapperCombinedCls = clsx({ 'active-bg': railContext.selectedValue === radioValue }, railTileWrapperCls)

  const handleChange = (event) => {
    event.preventDefault()

    railContext.setSelectedValue(radioValue)
    railContext.toggleCb(radioValue)
  }

  const handleKeyDown = (event) => {
    // Check if Enter or Space is pressed
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleChange()
    }
  }

  // Button would have been a good choice for this. But I chose input radio so that it indicates only one item can be selected.
  // We did something different for tabs because of the dual role.
  // I am unsure which is better, but at least here we have a role and also am adding the proper events and selected
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
  return (
    <label className={railTileWrapperCombinedCls}>
      <input
        className={railTileInputCombinedCls}
        tabIndex="0"
        role="button"
        type="radio"
        name={radioGroup}
        value={radioValue}
        checked={railContext.selectedValue === radioValue}
        onChange={handleChange}
        onClick={handleChange}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel ? ariaLabel : text}
      />
      {el ? el : <span className={railTileTextWrapperCls}>{text}</span>}
    </label>
  )
}
