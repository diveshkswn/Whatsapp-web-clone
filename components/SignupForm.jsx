import { TextField, Button } from '@material-ui/core';
import styles from '../styles/SignupForm.module.css';

export default function SignupForm(props) {
  const { setSignupFormState, setLoginFormState } = props;
  return (
    <div className="SignupFormContainer">
      <form className={styles.SignupForm}>
        <TextField label="Email" type="text" />
        <TextField label="Password" type="password" />
        <TextField label="Confirm Password" type="password" />
        <Button className={styles.SignupButton} type="submit">SIGNUP</Button>
        <span>
          Already have a Account?
          <Button
            variant="text"
            color="primary"
            onClick={() => { setLoginFormState((v) => !v); setSignupFormState((v) => !v); }}
          >
            LOGIN
          </Button>
        </span>
      </form>
    </div>
  );
}
