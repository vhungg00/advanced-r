import { Flex, FlexProps } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'

type Props = {
  isClear?: boolean
  onClick?: () => void
  children?: ReactNode
} & FlexProps

export const Backdrop = forwardRef<HTMLDivElement, Props>(
  ({ isClear, children, onClick, ...rest }, ref) => (
    <Flex
      ref={ref}
      aria-hidden={true}
      data-clear={isClear}
      data-event={Boolean(onClick)}
      position={'fixed'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Flex>
  ),
)
