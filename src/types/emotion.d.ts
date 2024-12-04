import '@emotion/react'

import { TTheme as CustomTheme } from 'theme'

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends CustomTheme {}
}
