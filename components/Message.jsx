import styles from '../styles/Message.module.css';

export default function Message(props) {
  const { user, message } = props;

  return (
    <div className={styles.MessageContainer}>
      <p>{message.message}</p>
    </div>
  );
}
