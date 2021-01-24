import React from 'react'
import styled from '@emotion/styled'

interface Props {
  children?: React.ReactNode
}

const Container = styled.div`
  background-color: white;
  border: 1px solid hsl(0, 0%, 78%);
  border-radius: 8px;
  padding: 1rem 2rem;
`

function Card({ children }: Props) {
  return <Container>{children}</Container>
}

export default Card
