import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Link from "next/link";

const RESET_PASSWORD = gql`
  mutation resetUserPassword(
    $key: String!
    $login: String!
    $password: String!
  ) {
    resetUserPassword(
      input: {
        key: $key
        login: $login
        password: $password
      }
    ) {
      user {
        databaseId
      }
    }
  }
`;

interface Props {
  resetKey: string;
  login: string;
}

export default function SetPasswordForm({ resetKey: key, login }: Props) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [clientErrorMessage, setClientErrorMessage] = useState('');
  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD);
  const wasPasswordReset = Boolean(data?.resetUserPassword?.user?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const isValid = validate();
    if (!isValid) return

    resetPassword({
      variables: {
        key,
        login,
        password,
      },
    }).catch(error => {
      console.error(error);
    });
  }

  function validate() {
    setClientErrorMessage('');

    const isPasswordLongEnough = password.length >= 5;
    if (!isPasswordLongEnough) {
      setClientErrorMessage('Password must be at least 5 characters.');
      return false;
    }

    const doPasswordsMatch = password === passwordConfirm;
    if (!doPasswordsMatch) {
      setClientErrorMessage('Passwords must match.');
      return false;
    }

    return true;
  }

  if (wasPasswordReset) {
    return (
      <>
        <p>Your new password has been set.</p>
        <Link href="/log-in">
          <a>Log in</a>
        </Link>
      </>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="new-password">Password</label>
        <input
          id="new-password"
          type="password"
          value={password}
          autoComplete="new-password"
          onChange={event => setPassword(event.target.value)}
          required
        />
        <label htmlFor="password-confirm">Confirm Password</label>
        <input
          id="password-confirm"
          type="password"
          value={passwordConfirm}
          autoComplete="new-password"
          onChange={event => setPasswordConfirm(event.target.value)}
          required
        />
        {clientErrorMessage ? (
          <p className="error-message">{clientErrorMessage}</p>
        ) : null}
        {error ? (
          <p className="error-message">{error.message}</p>
        ) : null}
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save password'}
        </button>
      </fieldset>
    </form>
  );
}
