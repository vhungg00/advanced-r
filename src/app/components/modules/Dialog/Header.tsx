import { FC, ReactNode } from 'react'
import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react'
import styled from '@emotion/styled'

type Props = {
  onClose?: () => void
  styleIcon?: BoxProps
  children?: ReactNode
} & FlexProps

export const Header: FC<Props> = ({
  onClose,
  children,
  styleIcon,
  ...props
}) => {
  return (
    <Flex position={'relative'} {...props}>
      {children}
      <Box position={'absolute'} right={0} onClick={onClose} {...styleIcon}>
        <IconClose />
      </Box>
    </Flex>
  )
}

export const IconClose = styled.i<{ $color?: string }>`
  position: relative;
  top: 0;
  right: 0;
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
  outline: unset;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 1px;
    height: 18px;
    border-left: solid 2px ${props => props.$color || `rgba(92, 92, 92, 1)`};
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 1px;
    height: 18px;
    border-left: solid 2px ${props => props.$color || `rgba(92, 92, 92, 1)`};
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`
