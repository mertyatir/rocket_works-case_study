"use client";

// TODO: Use server-side session cookies to make this component SSR compatible
// https://firebase.google.com/docs/auth/admin/manage-cookies#node.js_5

import { useUserSession } from "@/hooks/use-user-session";
import { signInWithGoogle } from "@/libs/firebase/auth";
import { createSession } from "@/actions/auth-actions";

import { FcGoogle } from "react-icons/fc";

export function GoogleSignInButton({ session }: { session: string | null }) {
  const userSessionId = useUserSession(session);

  const handleSignIn = async () => {
    const userUid = await signInWithGoogle();
    if (userUid) {
      await createSession(userUid);
    }
  };

  if (!userSessionId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <button
          onClick={handleSignIn}
          className="inline-flex items-center bg-white hover:bg-red-700 hover:text-white text-black font-medium py-2 px-4 rounded shadow-lg"
        >
          <FcGoogle className="mr-2" /> Sign In with Google
        </button>
      </div>
    );
  }
}

export default GoogleSignInButton;
