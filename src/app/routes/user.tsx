import { RouteObject } from 'react-router-dom'
import { HomePage } from 'app/pages/HomePage'
import { ScreenPathUrls } from 'types/ScreenPathUrl'
import { Layout } from 'app/components/elements/Layout'
import { LuckyWheelPage } from 'app/pages/LuckWheelPage'

export const routesUsers: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: ScreenPathUrls.Root,
        element: <HomePage />,
      },
      {
        path: ScreenPathUrls.LuckyWheel,
        element: <LuckyWheelPage />,
      },
    ],
  },
]
