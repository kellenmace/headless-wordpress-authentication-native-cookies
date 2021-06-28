import { useMutation, gql } from "@apollo/client";

import useAuth, { User } from "../hooks/useAuth";

const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: ID!
    $firstName: String!,
    $lastName: String!,
    $email: String!
  ) {
    updateUser(input: {
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    }) {
      user {
        databaseId
      }
    }
  }
`;

export default function ProfileForm() {
  const { user } = useAuth();
  const { id, firstName, lastName, email } = user as User;
  const [updateProfile, { data, loading, error }] = useMutation(UPDATE_PROFILE);
  const wasProfileUpdated = Boolean(data?.updateUser?.user?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data);
    updateProfile({
      variables: { id, ...values, },
    }).catch(error => {
      console.error(error);
    });
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      {wasProfileUpdated ? (
        <p className="profile-update-confirmation">
          ✅ Profile details have been updated.
        </p>
      ) : null}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="profile-first-name">First Name</label>
        <input
          id="profile-first-name"
          type="text"
          name="firstName"
          defaultValue={firstName || ''}
          autoComplete="given-name"
        />
        <label htmlFor="profile-last-name">Last Name</label>
        <input
          id="profile-last-name"
          type="text"
          name="lastName"
          defaultValue={lastName || ''}
          autoComplete="family-name"
        />
        <label htmlFor="profile-email">Email</label>
        <input
          id="profile-email"
          type="email"
          name="email"
          defaultValue={email || ''}
          autoComplete="email"
        />
        {error ? (
          <p className="error-message">{error.message}</p>
        ) : null}
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </fieldset>
    </form>
  );
}
