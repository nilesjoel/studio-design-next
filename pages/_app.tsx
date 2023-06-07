import type { AppProps } from 'next/app'
import { DefaultTheme } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

import GlobalStyle from '../components/globalstyles'

import { StudioApp } from '../components/StudioApp'
import { StudioContextProvider } from '../contexts/StudioContext'

const theme: DefaultTheme = {
  colors: {
    // background: '#F6F9FC',
    // backgroundInverse: '#7A8997',
    // positive: '#FEDED2',
    // negative: '#180e64',
    // primary: '#FF4785',
    // secondary: '#1EA7FD',
    // tertiary: '#DDDDDD',
    // text: '#222222',
    "background": "#43A047", // Forest Green Background
  "backgroundInverse": "#7A5A4A", // Earth Brown Background
  "positive": "#FFC107", // Flower Yellow Color
  "negative": "#A0C4DE", // Sky Blue Color
  "primary": "#6ABB6D", // Moss Green Color
  "primaryDark" : "#2E7D32", // Dark Moss Green Color
  "secondary": "#4E657A", // River Blue Color
  "tertiary": "#ebcdd7 ", // White Color
  "text": "#222222", // Black Color
  },
  spacing: {
    padding: {
      small: 10,
      medium: 20,
      large: 30,
    },
    borderRadius: {
      small: 5,
      default: 10,
    },
  },
  typography: {
    type: {
      primary: '"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      code: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    },
    weight: {
      regular: '400',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    size: {
      s1: 12,
      s2: 14,
      s3: 16,
      m1: 20,
      m2: 24,
      m3: 28,
      l1: 32,
      l2: 40,
      l3: 48,
    },
  },
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {

  const studioContext = {};

  return (
    <>
    <SessionProvider session={session}>
     <StudioContextProvider state={studioContext}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StudioApp><Component {...pageProps}/></StudioApp>
      </ThemeProvider>
      </StudioContextProvider>
      </SessionProvider>
    </>
  )
}
