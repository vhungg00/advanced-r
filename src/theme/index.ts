import { extendTheme } from '@chakra-ui/react'
import { space } from './space'
import { fontSizes } from './fontSizes'
import { fontWeights } from './fontWeights'
import { colors } from './colors'
import { breakpoints } from './breakpoints'
import { letterSpacings } from './letterSpacings'
import { lineHeights } from './lineHeights'
import { radii } from './radii'
import { sizes } from './sizes'
import { zIndices } from './zIndices'
import { gradients } from './gradients'
import { shadows } from './shadows'
import { buttonTheme } from './components/buttonTheme'
import { inputTheme } from './components/inputTheme'
import { textareaTheme } from './components/textAreaTheme'

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  zIndices,
  sizes,
  radii,
  letterSpacings,
  breakpoints,
  colors,
  space,
  fontSizes,
  fontWeights,
  lineHeights,
  gradients,
  shadows,
  components: {
    Button: buttonTheme,
    Input: inputTheme,
    Textarea: textareaTheme,
  },
})

export type TTheme = typeof theme
