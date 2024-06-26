import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { cache } from '../cache';

import { appWithTranslation } from 'next-i18next';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

import { SessionProvider } from "next-auth/react"

import CookieConsent from "react-cookie-consent";

const queryClient = new QueryClient()

function MyApp(props) {
  const { Component, pageProps: { session, ...pageProps } } = props;

  const myTheme = {
    colorScheme: 'dark',

  }

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <title>Genshin Community</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" />


      </Head>
      <MantineProvider
        theme={myTheme}
        withGlobalStyles
        withNormalizeCSS
        emotionCache={cache}
      >
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <NotificationsProvider>
              {getLayout(<Component {...pageProps} />)}
            </NotificationsProvider>
          </QueryClientProvider>
        </SessionProvider>
      </MantineProvider>


      <CookieConsent buttonStyle={{ backgroundColor: '#1a1b1e', color: '#1971c2', border: '1px solid #1971c2', borderRadius: '5px' }}>This website uses cookies to enhance the user experience.</CookieConsent>


    </>
  );
}

export default appWithTranslation(MyApp);

