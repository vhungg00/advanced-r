import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import styled from '@emotion/styled'
import { ProfileWithUser, UserContextProvider } from 'contexts/UserContext'
import { Content } from './components/modules/Content'

/**
 * @returns Component Home Page
 */
export function HomePage() {
  const [show, setShow] = useState<boolean>(false)

  return (
    <Wrapper>
      <Helmet>
        <title>Home Page1</title>
        <meta content="A Boilerplate application homepage" name="description" />
      </Helmet>
      <div>
        <Title>Hello World</Title>
      </div>
      <UserContextProvider>
        <div style={{ flexDirection: 'column' }}>
          <button onClick={() => setShow(!show)}>Toggle</button>
          <ProfileWithUser />
          {show && <Content />}
        </div>
      </UserContextProvider>
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
