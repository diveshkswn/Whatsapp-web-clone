import { TextField, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import { useRouter } from 'next/router';
import Alert from '@material-ui/lab/Alert';
import { useState, useRef } from 'react';
import { login } from '../Context/Authcontext';
import styles from '../styles/LoginForm.module.css';

export default function LoginForm(props) {
  const { setSignupFormState, setLoginFormState, loginFormState } = props;
  const router = useRouter();

  // Inputs
  const passwordRef = useRef();
  const emailRef = useRef();

  // state
  const [errorState, setErrorState] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    setLoading(true);
    try {
      e.preventDefault();
      const userData = await login(emailRef.current.value, passwordRef.current.value);
      router.push('/');
    } catch (er) {
      setErrorState(er.message);
    }
    setLoading(false);
  }

  return (
    <Grow in={loginFormState}>
      <div className={styles.LoginFormContainer}>
        <form className={styles.LoginForm} onSubmit={handleSubmit}>
          <TextField inputRef={emailRef} label="Email" type="text" />
          <TextField inputRef={passwordRef} label="Password" type="password" />
          <Button className={styles.LoginButton} type="submit">
            {loading ? <CircularProgress size={25} /> : 'LOGIN' }
          </Button>
          {errorState && <Alert severity="error">{errorState}</Alert>}
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
    </Grow>
  );
}
