import {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  MouseEvent,
  useState,
} from 'react'
import { ChakraProps, Flex, FlexProps } from '@chakra-ui/react'
import { createPortal } from 'react-dom'
import { addClass, removeClass } from 'utils/function'
import { Backdrop } from './Backdrop'

type Props = {
  isOpen: boolean
  styleBackdrop?: ChakraProps['__css']
  children?: ReactNode
  onClickOverlay?: () => void
} & FlexProps

const TIME_OUT = 350
const DIALOG_WRAPPER_ID = 'rootDialog'
const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div')

  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)

  return wrapperElement
}

const animatedActive = (isOpen: boolean) => ({
  opacity: Number(isOpen),
  transition: 'all .3s ease-in-out',
})

const toggleOverflowHidden = (add: boolean) => {
  if (typeof document !== 'undefined') {
    const html = document.querySelector('html')
    if (add) addClass(html!, 'overflow-hidden')
    else removeClass(html!, 'overflow-hidden')
  }
}

export const Dialog: FC<Props> = ({
  isOpen,
  styleBackdrop,
  children,
  onClickOverlay,
  ...props
}) => {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const [isShow, setIsShow] = useState<boolean>(isOpen)
  const [animated, setAnimated] = useState<CSSProperties>(animatedActive(false))
  const isOverlayClickable = Boolean(onClickOverlay)

  useEffect(() => {
    if (isOpen) {
      setIsShow(isOpen)
      timeoutRef.current = setTimeout(() => {
        setAnimated(animatedActive(isOpen))
      }, 10)
    } else {
      setAnimated(animatedActive(isOpen))
      timeoutRef.current = setTimeout(() => setIsShow(isOpen), TIME_OUT)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsShow(false)
    onClickOverlay?.()
  }, [onClickOverlay])

  const handleClickOverlay = useCallback(
    (event?: MouseEvent<HTMLDivElement>) => {
      if (
        !isOverlayClickable ||
        bodyRef.current?.contains(event?.target as Node)
      )
        return

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setAnimated(animatedActive(false))
      timeoutRef.current = setTimeout(handleClose, TIME_OUT)
    },
    [handleClose, isOverlayClickable],
  )

  useEffect(() => {
    if (isShow) toggleOverflowHidden(true)
    return () => {
      toggleOverflowHidden(false)
    }
  }, [isShow])

  useEffect(() => {
    return () => {
      const html = document.querySelector('html')
      removeClass(html!, 'overflow-hidden')
    }
  }, [])

  const el = useMemo(
    () =>
      typeof window === 'object'
        ? document.getElementById(DIALOG_WRAPPER_ID) ||
          createWrapperAndAppendToBody(DIALOG_WRAPPER_ID)
        : null,
    [],
  )

  return el && isShow
    ? createPortal(
        <Flex
          className={'dialog'}
          height={0}
          left={0}
          position={'absolute'}
          top={0}
          w={0}
        >
          <Backdrop
            __css={styleBackdrop}
            onClick={isOverlayClickable ? handleClickOverlay : undefined}
          />
          <Flex
            backgroundColor={'white'}
            flexDirection={'column'}
            left={'50%'}
            maxH={'calc(100dvh - 32px)'}
            maxW={'500px'}
            minH={'30px'}
            minW={'310px'}
            position={'fixed'}
            style={{ ...animated }}
            top={'50%'}
            transform={'translate(-50%, -50%)'}
            width={'90%'}
            zIndex={999}
            {...props}
          >
            {children}
          </Flex>
        </Flex>,
        el!,
      )
    : null
}
