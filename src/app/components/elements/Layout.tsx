import { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

export const Layout: FC<{
  hasHeader?: boolean
  children?: ReactNode
}> = ({ children }) => {
  return (
    <Flex
      flexDirection={'column'}
      flex={1}
      width={'full'}
      backgroundColor={'white'}
    >
      {/* Common Header */}
      {children || <Outlet />}
    </Flex>
  )
}
