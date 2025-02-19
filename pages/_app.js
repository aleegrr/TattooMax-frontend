import Head from 'next/head';
import { useEffect } from 'react';
import '/styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS on client-side
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="TattooMax - El mejor estudio de tatuajes. Donde la tinta es lo max..." />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="/favicon.png" />
        <title>TattooMax - Estudio de Tatuajes</title>
      </Head>
      <div id="page-container">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
