import { useRouter } from 'next/router';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import { AttachFile, InsertEmoticon, MicOutlined } from '@material-ui/icons';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import styles from '../styles/ChatScreen.module.css';
import { useAuth } from '../Context/Authcontext';
import { projectFirestore, timestamp } from '../firebase';
import Message from './Message';
import getRecipientEmail from '../utils/getRecipientEmail';

export default function ChatScreen(props) {
  const { chat, messages } = props;
  const [input, setInput] = useState('');
  const { currentUser } = useAuth();
  const router = useRouter();
  const routeId = router.query.id;
  const recipientEmail = getRecipientEmail(chat.users, currentUser);
  const [messagesSnapshot] = useCollection(projectFirestore
    .collection('chats')
    .doc(routeId)
    .collection('messages')
    .orderBy('timestamp', 'asc'));

  function showMessages() {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    }

    return JSON.parse(messages).map((message) => (
      <Message
        key={message.id}
        user={message.user}
        message={message}
      />
    ));
  }

  function sendMessage(e) {
    e.preventDefault();
    // Update last seen
    projectFirestore.collection('users').doc(currentUser.uid).set({
      lastSeen: timestamp(),
    }, { merge: true });

    // Adding message to db.
    projectFirestore.collection('chats').doc(routeId).collection('messages').add({
      timestamp: timestamp(),
      message: input,
      user: currentUser.email,
      photoURL: currentUser?.photoURL,

    });

    setInput('');
  }

  return (
    <div className={styles.ChatScreenContainer}>
      <div className={styles.ChatHeader}>
        <Avatar />
        <div className={styles.HeaderInfo}>

          <h3>{recipientEmail}</h3>
          <p>Last Seen...</p>
        </div>

        <div className={styles.HeaderIcons}>
          <IconButton>
            <MoreVert />
          </IconButton>
          <IconButton><AttachFile /></IconButton>

        </div>

      </div>
      <div className={styles.ChatMessageContainer}>
        {/* showMessages */}

        {showMessages()}
        <div className={styles.EndOfMessage} />
      </div>
      <form className={styles.ChatInputContainer} onSubmit={sendMessage}>
        <InsertEmoticon />
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value); }}
          className={styles.Input}
        />

        <IconButton type="submit" disabled={!input} style={{ backgroundColor: 'var(--theme-Color-Light)' }} color="inherit"><SendIcon style={{ color: 'whitesmoke' }} /></IconButton>

        <IconButton>

          <MicOutlined />
        </IconButton>

      </form>
    </div>
  );
}
