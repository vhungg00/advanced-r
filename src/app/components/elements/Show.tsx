import { FC, ReactNode } from 'react'

type Props = {
  if?: boolean | string | number
  children?: ReactNode
}

export const Show: FC<Props> = ({ if: then, children }) => {
  if (!then) return null

  return <>{children}</>
}
