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
      backgroundColor={'rgba(0, 0, 0, 0.6)'}
      css={{
        '&[data-event=true]': {
          cursor: 'pointer',
        },
        '&[data-clear="true"]': {
          backgroundColor: 'rgba(255, 255, 255, 0)',
        },
      }}
      cursor={'default'}
      data-clear={isClear}
      data-event={Boolean(onClick)}
      h={'100dvh'}
      inset={0}
      position={'fixed'}
      w={'100dvw'}
      zIndex={888}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Flex>
  ),
)
