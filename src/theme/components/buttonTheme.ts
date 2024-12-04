import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const originalOutline = defineStyle(props => {
  const { colorScheme: c } = props
  return {
    color: `${c}.500`,
    border: '1px',
    borderColor: `${c}.500`,
    _hover: {
      bg: `${c}.50`,
    },
  }
})

const spectraOutline = defineStyle({
  color: `theme.spectra`,
  borderWidth: '1px',
  borderColor: `theme.hummingBird`,
})

const grayPrimary = defineStyle({
  color: 'white',
  backgroundColor: 'gray.600',
})

const cyanOutline = defineStyle({
  color: 'primary.700',
  borderColor: 'primary.700',
  borderWidth: '1px',
  backgroundColor: 'white',
})

const cyanPrimary = defineStyle({
  color: 'white',
  backgroundColor: 'primary.700',
  _disabled: {
    backgroundColor: 'primary.700 !important',
  },
})

const gradientPrimary = defineStyle({
  color: 'white',
  bgGradient: 'top !important',
})

const yellowGradientPrimary = defineStyle({
  color: 'white',
  bgGradient: 'base',
  _hover: {
    bgGradient: 'base',
  },
  _disabled: {
    bg: 'gray.500',
    opacity: 1,
    _hover: {
      bg: 'gray.500 !important',
    },
  },
})

const backGreenPrimary = defineStyle({
  color: 'primary.700',
  backgroundColor: 'backGreen.400',
  _active: {
    backgroundColor: 'white',
  },
  _hover: {
    backgroundColor: 'white',
  },
})

const tealGreenPrimary = defineStyle({
  color: 'white',
  backgroundColor: 'primary.700',
  h: 9,
  _hover: {
    backgroundColor: 'primary.600',
  },
})

const md = defineStyle({
  fontSize: 'md',
  px: '4',
  lineHeight: '100',
  h: '48px',
  letterSpacing: 'base',
  borderRadius: 'full',
})

const xs = defineStyle({
  fontSize: 'xs',
  px: '3',
  lineHeight: '100',
  h: '48px',
  letterSpacing: 'base',
  borderRadius: 'full',
})

const sm = defineStyle({
  fontSize: 'sm',
  px: '4',
  lineHeight: '100',
  h: '44px',
  letterSpacing: 'base',
  borderRadius: 'full',
})

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    size: 'md',
  },
  baseStyle: {
    outline: 0,
    fontWeight: 'bold',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  variants: {
    tealGreenPrimary,
    grayPrimary,
    gradientPrimary,
    backGreenPrimary,
    yellowGradientPrimary,
    spectraOutline,
    cyanOutline,
    cyanPrimary,
    originalOutline,
  },
  sizes: { md, sm, xs },
})
