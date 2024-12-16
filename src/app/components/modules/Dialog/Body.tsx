import { FC, ReactNode } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

export const Body: FC<{ children: ReactNode } & FlexProps> = ({
  children,
  ...props
}) => <Flex {...props}>{children}</Flex>
