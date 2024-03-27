import React, { ReactElement } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  className?: string
}

export default function UiButton({ className, text, ...props }: Props): ReactElement {
  const defaultClassName = 'btn-base btn-md bg-primary'
  const classes = className ? className : defaultClassName

  return (
    <button className={classes} {...props}>
      {text}
    </button>
  )
}
