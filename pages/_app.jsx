/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LinearProgress } from '@material-ui/core';
import Layout from '../components/Layout';
import AuthProvider from '../Context/Authcontext';

function MyApp({ Component, pageProps }) {
  const [topLoading, setTopLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    function handleRouteChangeStart() {
      setTopLoading(false);
    }
    function handleRouteChangeEnd() {
      setTopLoading(true);
    }

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
    };
  }, [router]);

  return (
    <AuthProvider>
      <Layout>
        <div className="themeContainer">
          <LinearProgress hidden={topLoading} />

          <Component {...pageProps} />
        </div>

      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
