import { createAuthClient } from 'better-auth/react';

// Create and export the better-auth client
export const authClient = createAuthClient({
  //   baseURL: window.location.origin,
});

// Export commonly used hooks for convenience
export const { useSession, signIn, signOut, signUp } = authClient;
