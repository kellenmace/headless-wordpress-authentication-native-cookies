import { useMutation, gql } from "@apollo/client";
import Link from "next/link";

const REGISTER_USER = gql`
  mutation registerUser(
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    registerUser(
      input: {
        username: $email
        email: $email
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      user {
        databaseId
      }
    }
  }
`;

export default function SignUpForm() {
  const [register, { data, loading, error }] = useMutation(REGISTER_USER);
  const wasSignUpSuccessful = Boolean(data?.registerUser?.user?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data);
    register({
      variables: values,
    }).catch(error => {
      console.error(error);
    });
  }

  if (wasSignUpSuccessful) {
    return (
      <p>
        Thanks! Check your email – an account confirmation link has been sent to you.
      </p>
    )
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="sign-up-first-name">First name</label>
        <input
          id="sign-up-first-name"
          type="text"
          name="firstName"
          autoComplete="given-name"
          required
        />
        <label htmlFor="sign-up-last-name">Last name</label>
        <input
          id="sign-up-first-name"
          type="text"
          name="lastName"
          autoComplete="family-name"
          required
        />
        <label htmlFor="sign-up-email">Email</label>
        <input
          id="sign-up-email"
          type="email"
          name="email"
          autoComplete="username"
          required
        />
        {error ? (
          (error.message.includes('This username is already registered') ? (
            <p className="error-message">
              You&#39;re already signed up! <Link href="/log-in">Log in</Link>
            </p>
          ) : (
            <p className="error-message">{error.message}</p>
          ))
        ) : null}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </fieldset>
      <p>
        Already have an account? <Link href="/log-in"><a>Log in</a></Link>
      </p>
    </form>
  );
}
