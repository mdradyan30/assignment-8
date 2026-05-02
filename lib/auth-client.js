import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;

// Custom update user function
export const updateProfile = async (name, image) => {
  try {
    const response = await fetch("/api/auth/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, image }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error };
    }

    return data;
  } catch (error) {
    return { error: { message: error.message } };
  }
};
