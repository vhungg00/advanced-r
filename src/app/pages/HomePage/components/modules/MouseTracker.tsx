import { FC, ReactNode, MouseEvent, useState } from 'react'
import { Flex } from '@chakra-ui/react'

type Position = {
  x: number
  y: number
}

type Props = {
  children: (position: Position) => ReactNode
}

export const MouseTracker: FC<Props> = ({ children }) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

  const handleOnMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    setPosition({ x: event.clientX, y: event.clientY })
  }

  return (
    <Flex
      backgroundColor={'red'}
      height={'50px'}
      width={'50px'}
      onMouseMove={handleOnMouseMove}
    >
      {children(position)}
    </Flex>
  )
}
