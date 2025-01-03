import { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

export const Layout: FC<{
  hasHeader?: boolean
  children?: ReactNode
}> = ({ children }) => {
  return (
    <Flex
      backgroundColor={'white'}
      flex={1}
      flexDirection={'column'}
      width={'full'}
    >
      {/* Common Header */}
      {children || <Outlet />}
    </Flex>
  )
}
