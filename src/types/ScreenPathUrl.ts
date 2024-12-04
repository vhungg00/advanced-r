/*
 * Migrate the URL first
 */
export type ScreenPathUrl =
  | '/'
  | '/consult'
  | '/complete'
  | '/error/'
  | '/system-error'

export const ScreenPathUrls = {
  Root: '/',
  Consult: '/consult',
  Completed: '/complete',
  BusinessError: '/error/',
  SystemError: '/system-error',
} as const
