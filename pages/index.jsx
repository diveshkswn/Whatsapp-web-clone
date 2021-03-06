import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import styles from '../styles/Home.module.css';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../Context/Authcontext';
import { projectFirestore, timestamp } from '../firebase';

export default function Home() {
// redux state
  const theme = useSelector((state) => state.themeSwitcher);

  const route = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      console.log('Updating user');
      projectFirestore.collection('users').doc(currentUser.uid).set({
        email: currentUser.email,
        lastSeen: timestamp(),
        photoURL: currentUser.photoURL,

      }, { merge: true });
    }
  }, [currentUser]);

  if (!currentUser) { route.push('/login'); return ''; }

  return (
    <>
      <Head>
        <title>Whatsapp Web</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.Container} ${theme.themeDark ? 'dark' : ''}`}>
        <div className={styles.SidebarContainer}>
          <Sidebar />
        </div>

        <div className={styles.chatContainer}>
          <div className={`${styles.Logo} ${styles.Min}`}>
            <Image src="/whatsapp-logo-png-2263.png" layout="fill" objectFit="contain" alt="Whatsapp LOGO" />

          </div>
          <div className={styles.IndexTitle}>
            <h2>WhatsApp Web Clone</h2>
          </div>
          <div className={styles.Author}>
            <h3>
              By
              {' '}
              {' '}
              <a target="_blank" href="https://diveshkswn.github.io/portfolio_/" rel="noreferrer">Divesh Keswani</a>
            </h3>
          </div>
          <div className={styles.IndexFooterLogo}>
            <div className={`${styles.LogoVercel} `}>
              <Image src="/vercel.svg" layout="fill" objectFit="contain" alt="Whatsapp LOGO" />

            </div>
            <div className={`${styles.LogoVercel} `}>
              <Image src="/next-js-seeklogo.com.svg" layout="fill" objectFit="contain" alt="Whatsapp LOGO" />

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
