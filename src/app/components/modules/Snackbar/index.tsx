import {
  createRef,
  forwardRef,
  ReactPortal,
  useImperativeHandle,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { ChakraProps, Flex } from '@chakra-ui/react'

type AlertColor = 'success' | 'info' | 'warning' | 'error'

type Option = {
  message?: string
  severity?: AlertColor
}

type Snackbar = {
  showSnackbar: (option: Option) => void
}

type Props = {
  __css?: ChakraProps['__css']
  duration?: number
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div')

  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)

  return wrapperElement
}

export const snackbarRef = createRef<Snackbar>()

export const Snackbar = forwardRef<Snackbar, Props>(
  (_, ref): ReactPortal | null => {
    const [isVisible] = useState<boolean>(false)

    useImperativeHandle(ref, () => {
      return {
        showSnackbar: () => console.log('1234'),
      }
    })

    if (typeof window === 'object') return null
    let el = document.getElementById('rootSnackbar')
    if (!el) {
      el = createWrapperAndAppendToBody('rootSnackbar')
    }

    return isVisible ? createPortal(<Flex></Flex>, el) : null
  },
)
