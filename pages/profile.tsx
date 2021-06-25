import AuthContent from "../components/AuthContent";
import Layout from "../components/Layout";
import ProfileForm from "../components/ProfileForm";

export default function Profile() {
  return (
    <Layout>
      <h1>Profile</h1>
      <AuthContent>
        <ProfileForm />
      </AuthContent>
    </Layout>
  );
}
