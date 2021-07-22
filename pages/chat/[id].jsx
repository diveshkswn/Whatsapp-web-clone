import Head from 'next/head';
import { useRouter } from 'next/router';
import Sidebar from '../../components/Sidebar';
import styles from '../../styles/Chat.[id].module.css';
import { useAuth } from '../../Context/Authcontext';
import ChatScreen from '../../components/ChatScreen';

export default function ChatWithId() {
  const { currentUser } = useAuth();
  const router = useRouter();
  if (!currentUser) { router.push('/login'); return ''; }

  return (
    <div className={styles.Container}>
      <Head>
        <title>Chat</title>
      </Head>
      <div className={styles.SidebarContainer}>
        <Sidebar />
      </div>

      <div className={styles.chatContainer}>
        <h2>{router.query.id}</h2>
        <ChatScreen />
      </div>

    </div>
  );
}

// export async function getStaticProps(context) {
//   return {
//     props: { id: context.params.id },
//   };
// }

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: '1' } }],
//     fallback: 'blocking',
//   };
// }
