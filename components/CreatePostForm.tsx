import { useMutation, gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation createPost($title: String!, $content: String!) {
    createPost(input: {
      title: $title
      content: $content
      status: PUBLISH
    }) {
      post {
        databaseId
      }
    }
  }
`;

export default function CreatePostForm() {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);
  const wasPostCreated = Boolean(data?.createPost?.post?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data);
    createPost({
      variables: values
    }).catch(error => {
      console.error(error);
    });
  }

  if (wasPostCreated) {
    return (
      <p>Post successfully created.</p>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="create-post-title">Title</label>
        <input
          id="create-post-title"
          type="text"
          name="title"
          required
        />
        <label htmlFor="creat-post-content">Content</label>
        <textarea
          id="creat-post-content"
          name="content"
          required
        />
        {error ? (
          <p className="error-message">{error.message}</p>
        ) : null}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating post...' : 'Create post'}
        </button>
      </fieldset>
    </form>
  )
}
