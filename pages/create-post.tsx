import useAuth from "../hooks/useAuth";
import AuthContent from "../components/AuthContent";
import Layout from "../components/Layout";
import CreatePostForm from "../components/CreatePostForm";

export default function CreatePost() {
  const { user } = useAuth();
  const canCreatePosts = Boolean(user?.capabilities?.includes('publish_posts'));

  return (
    <Layout>
      <AuthContent>
        <h1>Create Post</h1>
        {canCreatePosts ? (
          <CreatePostForm />
        ) : (
          <p>You don&#39;t have the permissions necessary to create posts.</p>
        )}
      </AuthContent>
    </Layout>
  );
}
