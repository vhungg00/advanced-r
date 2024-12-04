import React, { FC, MouseEvent, useCallback, useState } from 'react'
import { Button as ButtonCustom, ButtonProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useMobile } from 'hooks/useMobile'

type Props = {
  outline?: boolean
  link?: boolean
} & Pick<ButtonProps, Exclude<keyof ButtonProps, 'outline'>>

export const Button: FC<Props> = ({
  disabled,
  onClick,
  fontSize,
  opacity,
  borderRadius,
  ...rest
}) => {
  const { isMobile } = useMobile()
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      setLoading(true)
      try {
        await onClick?.(e)
      } finally {
        setLoading(false)
      }
    },
    [onClick, disabled],
  )

  return (
    <ButtonStyled
      {...rest}
      borderRadius={borderRadius}
      disabled={disabled || rest.isDisabled}
      fontSize={fontSize}
      isDisabled={disabled || rest.isDisabled}
      isLoading={loading}
      isMobile={isMobile}
      opacity={opacity as number}
      outline={rest.outline as undefined}
      onClick={handleClick}
    />
  )
}

const ButtonStyled = styled(ButtonCustom, {
  shouldForwardProp: props =>
    props !== 'outline' &&
    props !== 'isDisabled' &&
    props !== 'link' &&
    props !== 'isMobile' &&
    props !== 'height' &&
    props !== 'width' &&
    props !== 'w',
})<{ link?: boolean }>`
  width: ${({ width, w }) => width || w || '100%'};
  height: ${({ height = '40px', link, h = '40px' }) =>
    link ? 'auto' : height || h};
  align-self: center;
  color: white;
  padding: 0;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`

/**
 * @returns Component OutlineButton
 */
export const OutlineButton = (
  props: React.ComponentPropsWithoutRef<'button'>,
) => (
  <Outline {...props}>
    <Text>{props.children}</Text>
  </Outline>
)

const Outline = styled.button`
  width: 100%;
  border-radius: 4px;
  background-color: white;
  border: 2px solid #6fb4f3;

  cursor: pointer;
  color: #6fb4f3;
  font-size: 14px;
  font-style: normal;

  font-weight: 700;
  line-height: 16px;
  min-height: 50px;
  max-height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.6;
    transition: opacity 0.2s ease-in-out;
  }
`

const Text = styled.p`
  font-weight: 400;
  margin: 0;
`
