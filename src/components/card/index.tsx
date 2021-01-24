import React from 'react'
interface Props {
  children?: React.ReactNode
}

function Card({ children }: Props) {
  return (
    <div
      className="card"
      style={{
        backgroundColor: 'white',
        border: '1px solid hsl(0, 0%, 78%)',
        borderRadius: '8px',
        padding: '1rem 2rem',
      }}
    >
      {children}
    </div>
  )
}

export default Card
