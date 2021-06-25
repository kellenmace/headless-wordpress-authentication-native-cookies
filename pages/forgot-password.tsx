import Layout from "../components/Layout";
import UnAuthContent from "../components/UnAuthContent";
import SendPasswordResetEmailForm from "../components/SendPasswordResetEmailForm";

export default function ForgotPassword() {
  return (
    <Layout>
      <h1>Forgot Your Password?</h1>
      <UnAuthContent>
        <SendPasswordResetEmailForm />
      </UnAuthContent>
    </Layout>
  )
}
