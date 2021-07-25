/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import Layout from '../components/Layout';
import AuthProvider from '../Context/Authcontext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <div className="themeContainer">
          <Component {...pageProps} />
        </div>

      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
