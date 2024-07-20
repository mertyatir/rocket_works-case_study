import GoogleSignInButton from "@/components/SharedComponents/GoogleSignInButton";

import { SESSION_COOKIE_NAME } from "@/constants";
import { cookies } from "next/headers";

export default function Home() {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  return <GoogleSignInButton session={session} />;
}
