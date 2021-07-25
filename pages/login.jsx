import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import styles from '../styles/login.module.css';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

export default function LoginPage() {
  const [loginFormState, setLoginFormState] = useState(false);
  const [signupFormState, setSignupFormState] = useState(false);
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={`${styles.Login_Container} dark`}>
        <div className={`${styles.Logo} ${styles.Min}`}>
          <Image src="/whatsapp-logo-png-2263.png" layout="fill" objectFit="contain" alt="Whatsapp LOGO" />
        </div>
        <div className={styles.LoginContainer}>
          {!loginFormState && !signupFormState && (
          <Button
            onClick={() => { setLoginFormState((v) => !v); }}
            className={styles.LoginButton}
            type="Button"
          >
            Enter
          </Button>
          )}
          {loginFormState && (
          <LoginForm
            loginFormState={loginFormState}
            setSignupFormState={setSignupFormState}
            setLoginFormState={setLoginFormState}
          />
          ) }
          {signupFormState && (
          <SignupForm
            signupFormState={signupFormState}
            setSignupFormState={setSignupFormState}
            setLoginFormState={setLoginFormState}
          />
          )}
        </div>
      </div>
    </>
  );
}
