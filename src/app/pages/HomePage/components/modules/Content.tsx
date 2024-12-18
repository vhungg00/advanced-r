import { Box, Flex, Image, Input, List, ListItem } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react'
import { MouseTracker } from './MouseTracker'

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
    if (counter > 3) setCounter(0)
  }, [counter])

  const handleIncrease = () => {
    setCounter(counter + 1)

    return () => {
      console.log('clean up')
    }
  }

  const [checked, setChecked] = useState<number[]>([2])

  const handleChecked = (id: number) => {
    setChecked(prev => {
      if (checked.includes(id)) {
        return checked.filter(item => item !== id)
      }
      return [...prev, id]
    })
  }

  return (
    <Flex flexDirection={'column'} marginTop={'40px'}>
      <h1>{counter}</h1>
      <button onClick={handleIncrease}>Click me!</button>

      <Box>
        {listChanel?.map(({ id, name }) => {
          return (
            <label key={id}>
              <input
                checked={checked.includes(id)}
                type="checkbox"
                onChange={() => handleChecked(id)}
              />
              {name}
            </label>
          )
        })}
      </Box>
      <MouseTracker>
        {position => <div>{JSON.stringify(position)}</div>}
      </MouseTracker>
    </Flex>
  )
}
