import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { ChakraProvider } from '@chakra-ui/react'

import { App } from 'app'
import { configureAxios } from 'configureAxios'
import { theme } from 'theme'

// Use consistent styling
import 'sanitize.css/sanitize.css'

// Initialize axios
configureAxios()

/**
 * Root App
 */
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ChakraProvider theme={theme}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ChakraProvider>,
)
