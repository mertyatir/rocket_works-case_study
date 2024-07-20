"use client";

// TODO: Use server-side session cookies to make this component SSR compatible
// https://firebase.google.com/docs/auth/admin/manage-cookies#node.js_5

import { useUserSession } from "@/hooks/use-user-session";
import { signOutWithGoogle } from "@/libs/firebase/auth";
import { removeSession } from "@/actions/auth-actions";

import { FcGoogle } from "react-icons/fc";

export function GoogleSignOutButton() {
  const userSessionId = useUserSession(null);

  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
  };

  if (userSessionId) {
    return (
      <button
        onClick={handleSignOut}
        className="inline-flex items-center bg-white hover:bg-red-700 hover:text-white text-black font-medium py-2 px-4 rounded shadow-lg"
      >
        <FcGoogle className="mr-2" />
        Sign Out
      </button>
    );
  }
}

export default GoogleSignOutButton;
