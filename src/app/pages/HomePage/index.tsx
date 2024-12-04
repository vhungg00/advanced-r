import { Helmet } from 'react-helmet-async'
import styled from '@emotion/styled'

/**
 * @returns Component Home Page
 */
export function HomePage() {
  return (
    <Wrapper>
      <Helmet>
        <title>Home Page1</title>
        <meta content="A Boilerplate application homepage" name="description" />
      </Helmet>
      <div>
        <Title>Hello World</Title>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
  background-color: white;
`

const Title = styled.h1`
  text-align: center;
`
