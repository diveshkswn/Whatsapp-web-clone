import { useRouter } from 'next/router';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import { AttachFile } from '@material-ui/icons';

import styles from '../styles/ChatScreen.module.css';
import { useAuth } from '../Context/Authcontext';

export default function ChatScreen(props) {
  const { chat, messages } = props;
  const { currentUser } = useAuth();
  const router = useRouter();

  return (
    <div className={styles.ChatScreenContainer}>
      <div className={styles.ChatHeader}>
        <Avatar />
        <div className={styles.HeaderInfo}>

          <h3>User Email</h3>
          <p>Last Seen...</p>
        </div>

        <div className="HeaderIcons">
          <IconButton>
            <MoreVert />
          </IconButton>
          <IconButton><AttachFile /></IconButton>

        </div>

      </div>
    </div>
  );
}
