/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { GlobalStyle } from 'styles/global-styles'
import { useTranslation } from 'react-i18next'
import { routesUsers } from './routes/user'

const routes = createBrowserRouter([...routesUsers])

/**
 * Routers for app
 * */
export function App() {
  const { i18n } = useTranslation()

  return (
    <>
      <Helmet
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
        titleTemplate="%s - React Boilerplate"
      >
        <meta content="A React Boilerplate application" name="description" />
      </Helmet>

      <RouterProvider router={routes} />
      <GlobalStyle />
    </>
  )
}
