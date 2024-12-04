import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const xs = defineStyle({
  fontSize: 'xs',
})

const md = defineStyle({
  fontSize: 'md',
})

const xl = defineStyle({
  fontSize: 'xl',
})

const sizes = {
  xs: definePartsStyle({ field: xs }),
  md: definePartsStyle({ field: md }),
  xl: definePartsStyle({ field: xl }),
}

const baseStyle = definePartsStyle({
  field: {
    borderWidth: `1px`,
    color: 'text.500',
    h: 11,
    fontWeight: 'medium',
    lineHeight: '100',
    borderRadius: 'base',
    letterSpacing: 'base',
    _disabled: { bg: 'gray.200', opacity: 1 },
    _hover: { borderColor: 'gray.500' },
    _placeholder: { color: 'text.200' },
    _focus: {
      _hover: { borderColor: 'blue.500' },
    },
    _invalid: {
      borderColor: 'theme.red',
      boxShadow: 'none',
      _focusVisible: {
        boxShadow: 'error',
      },
      _focus: {
        borderColor: 'theme.red',
      },
      _hover: {
        borderColor: 'theme.red',
      },
    },
  },
})

const outline = definePartsStyle({
  field: {
    borderColor: 'gray.500',
    background: 'white',
  },
})

export const inputTheme = defineMultiStyleConfig({
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
  baseStyle,
  sizes,
  variants: { outline },
})
