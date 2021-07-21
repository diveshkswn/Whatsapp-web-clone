import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../Context/Authcontext';
import { projectFirestore, timestamp } from '../firebase';

export default function Home() {
  const route = useRouter();
  const { currentUser } = useAuth();
  const demo = 'Divesh';

  // Updating/Adding user information on every change in currentUser of firebase
  useEffect(() => {
    console.log('Updating user');
    projectFirestore.collection('users').doc(currentUser.uid).set({
      email: currentUser.email,
      lastSeen: timestamp(),
      photoURL: currentUser.photoURL,

    }, { merge: true });
  }, [currentUser]);

  if (!currentUser) { route.push('/login'); return ''; }

  return (
    <>
      <Head>
        <title>Whatsapp Web</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Sidebar />
      </div>
    </>
  );
}
