import { useRouter } from "next/router";

import Layout from "../components/Layout";
import SetPasswordForm from "../components/SetPasswordForm";

export default function SetPassword() {
  const router = useRouter();
  const resetKey = String(router.query.key || '');
  const login = String(router.query.login || '');

  return (
    <Layout>
      <h1>Set Password</h1>
      <SetPasswordForm resetKey={resetKey} login={login} />
    </Layout>
  )
}
