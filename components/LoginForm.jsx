import { TextField, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../styles/LoginForm.module.css';

export default function LoginForm(props) {
  const { setSignupFormState, setLoginFormState } = props;
  return (
    <div className={styles.LoginFormContainer}>
      <form className={styles.LoginForm}>
        <TextField label="Email" type="text" />
        <TextField label="Password" type="password" />
        <Button className={styles.LoginButton} type="submit">
          LOGIN
          {/* <CircularProgress /> */}
        </Button>

        <span>
          No Account?
          <Button
            variant="text"
            color="primary"
            onClick={() => { setLoginFormState((v) => !v); setSignupFormState((v) => !v); }}
          >
            SIGNUP
          </Button>
        </span>
      </form>
    </div>
  );
}
