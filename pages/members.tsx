import Layout from "../components/Layout";
import AuthContent from "../components/AuthContent";

export default function MembersContent() {
  return (
    <Layout>
      <h1>Members</h1>
      <AuthContent>
        <p>Here is some top-secret members-only content!</p>
      </AuthContent>
    </Layout>
  );
}
