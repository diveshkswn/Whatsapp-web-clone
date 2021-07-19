/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { SearchOutlined } from '@material-ui/icons';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button, Avatar, IconButton } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import EmailValidator from 'email-validator';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
  const [createChat, setCreateChat] = useState(false);
  const chatInputRef = useRef();
  const [chatInputState, setChatInputState] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  function handleStartChat(e) {
    setChatInputState(e.target.value);
    if (chatInputState.length === 0) {
      setDisabled(false);
    }
  }

  function handleStartChatSubmit() {
    if (EmailValidator.validate(chatInputState)) {
      // db call into chats collection

    } else {
      setError('Enter Valid Email Address');
    }
  }

  // Event handler function to close chat input on ESC
  function handleChatClose(event) {
    if (event.key === 'Escape') {
      setCreateChat(false);
    }
  }

  useEffect(() => {
    // adding event only when createChat is true .ie Start New chat is clicked.
    // And focus on input after click
    if (createChat) { document.addEventListener('keydown', handleChatClose); chatInputRef.current.focus(); }

    // removing event on unmount
    return () => { document.removeEventListener('keydown', handleChatClose); };
  }, [createChat]);

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
      <div className={styles.SearchContainer}>
        <SearchOutlined />
        <input type="text" className={styles.SeachInput} placeholder="Search your chats" />
      </div>

      {createChat ? (
        <>
          <input
            ref={chatInputRef}
            value={chatInputState}
            onChange={handleStartChat}
            className={styles.ChatInput}
            placeholder="Name of contact. Press ESC to leave"
          />

          <Button type="button" onClick={handleStartChatSubmit} className={styles.ChatButton} disabled={disabled}>Start Chat</Button>
        </>
      ) : <Button type="button" onClick={() => { setCreateChat((val) => !val); }} className={styles.SidebarButton}>START A NEW CHAT</Button> }

    </div>
  );
}
