import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  as: string
}

export default function Emoji({ as, ...props }: Props) {
  return (
    <span role="img" {...props}>
      {as}
    </span>
  )
}
