/* eslint-disable react/destructuring-assignment */
import Head from 'next/head';

export default function Layout(props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {props.children}
    </>
  );
}
