import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const outline = defineStyle({
  _invalid: {
    _focusVisible: { borderColor: 'theme.red', boxShadow: 'none' },
    borderColor: 'red',
  },
  _placeholder: {
    fontWeight: 'medium',
    color: 'text.200',
    fontFamily: '"Noto Sans JP", sans-serif',
    fontSize: 'sm',
    lineHeight: '125',
    letterSpacing: '1px',
  },
  borderColor: 'gray.500',
})

export const textareaTheme = defineStyleConfig({
  variants: { outline },
})
