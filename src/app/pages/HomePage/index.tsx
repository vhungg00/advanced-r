import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import styled from '@emotion/styled'
import { ProfileWithUser, UserContextProvider } from 'contexts/UserContext'
import { Flex } from '@chakra-ui/react'
import { Content } from './components/modules/Content'
import { ViewVideo } from './components/elements/ViewVideo'

export interface ViewVideoHandle {
  play: () => void
  pause: () => void
}

/**
 * @returns Component Home Page
 */
export function HomePage() {
  const [show, setShow] = useState<boolean>(false)
  const videoRef = useRef<ViewVideoHandle>(null)

  const handlePlay = () => {
    videoRef.current?.play()
  }
  const handlePause = () => {
    videoRef.current?.pause()
  }

  console.log(videoRef.current)
  useEffect(() => {
    console.log(videoRef.current)
  }, [])

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
      <Flex flexDirection={'column'}>
        <ViewVideo ref={videoRef} />
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </Flex>
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
