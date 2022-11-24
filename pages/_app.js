import Head from 'next/head';
import { MantineProvider} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { cache } from '../cache';

import { appWithTranslation } from 'next-i18next';

function MyApp(props) {
  const { Component, pageProps } = props;

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
        <NotificationsProvider>
          {getLayout(<Component {...pageProps} />)}
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default appWithTranslation(MyApp);

