import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';
import { cache } from '../cache';

import { useRouter } from 'next/router';

import i18nextConfig from '../next-i18next.config'

const stylesServer = createStylesServer(cache);

export default class _Document extends Document {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale
    return (
      <Html lang={currentLocale} style={{scrollBehavior: 'smooth'}}>
        <Head>
        

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <ServerStyles html={initialProps.html} server={stylesServer} />
        </>
      ),
    };

    
  }
}