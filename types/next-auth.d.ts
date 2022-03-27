import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
        /** The user's access token. */
        accessToken: unknown,
        /** The user's refresh token. */
        refreshToken: unknown,
        /** The user's username. */
        username: unknown
    }
  }
}