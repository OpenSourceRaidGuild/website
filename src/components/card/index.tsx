import * as React from 'react';
import styled from '@emotion/styled'

interface Props {
  children?: React.ReactNode
}

const Container = styled.div`
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--roundness);
  padding: var(--space-4) var(--space-5);
`

function Card({ children }: Props) {
  return <Container>{children}</Container>
}

export default Card
