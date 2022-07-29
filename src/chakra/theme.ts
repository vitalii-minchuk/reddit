import { extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans/300'
import '@fontsource/open-sans/400'
import '@fontsource/open-sans/700'

export const theme = extendTheme({
  colors: {
    brand: {
      100: '#FF3c00',
    }
  },
  fonts: {
    body: 'Open Sans, sans-serif',
  }
})