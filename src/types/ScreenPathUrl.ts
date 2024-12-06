/*
 * Migrate the URL first
 */
export type ScreenPathUrl =
  | '/'
  | '/consult'
  | '/lucky-wheel'
  | '/complete'
  | '/error/'
  | '/system-error'

export const ScreenPathUrls = {
  Root: '/',
  Consult: '/consult',
  LuckyWheel: '/lucky-wheel',
  Completed: '/complete',
  BusinessError: '/error/',
  SystemError: '/system-error',
} as const
