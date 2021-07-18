import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.container}>

      <div className={styles.Header}>

        <div className={styles.UserAvatar}>
          <Avatar />
        </div>
        <div className={styles.IconContainer}>
          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>

      </div>
      <div className={styles.SearchContainer} />
    </div>
  );
}
