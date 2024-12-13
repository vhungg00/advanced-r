import { Flex, Image, Input, List, ListItem } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react'

const listChanel = [
  { id: 1, name: 'hoa ban food' },
  { id: 2, name: 'tho rung' },
  { id: 3, name: 'sang vlog' },
]
export const Content = () => {
  const [avatar, setAvatar] = useState<string>()
  const [activeChanel, setActiveChanel] = useState<number>(1)
  const [counter, setCounter] = useState<number>(0)

  useEffect(() => {
    return () => {
      if (!avatar) return
      URL.revokeObjectURL(avatar)
    }
  }, [avatar])

  const handlePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatar(URL.createObjectURL(file))
    e.target.value = ''
  }

  // useEffect(() => {
  //   const handleComment = (e: CustomEvent) => {
  //     console.log(e)
  //   }
  //   window.addEventListener(
  //     `chanel-${activeChanel}`,
  //     handleComment as EventListener,
  //   )

  //   return () => {
  //     window.removeEventListener(
  //       `chanel-${activeChanel}`,
  //       handleComment as EventListener,
  //     )
  //   }
  // }, [activeChanel])

  useLayoutEffect(() => {
    console.log('callback')

    if (counter > 3) setCounter(0)
    return () => {
      console.log('cleanUp')
    }
  }, [counter])

  const handleIncrease = () => {
    setCounter(counter + 1)
  }

  return (
    <Flex flexDirection={'column'} marginTop={'40px'}>
      <h1>{counter}</h1>
      <button onClick={handleIncrease}>Click me!</button>
    </Flex>
  )
}
