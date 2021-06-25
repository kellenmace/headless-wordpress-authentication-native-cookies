import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

import useAuth from "../hooks/useAuth";

export default function AuthContent({ children }: { children: ReactNode }) {
  const { loggedIn, loading } = useAuth();
  const router = useRouter();

  // Navigate unauthenticated users to Log In page.
  useEffect(() => {
    if (!loading && !loggedIn) {
      router.push('/log-in');
    }
  }, [loggedIn, loading, router]);

  if (loggedIn) {
    return <>{children}</>;
  }

  return <p>Loading...</p>;
}
