import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

//Look into using NXETAUTH _middleware.ts to automate
async function refreshAccessToken(token) {
    try {

        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken(); 
        // console.log("Refreshed token is", refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
            //Replace if new one came back, else fall back to old refresh token
        }

    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: "RefreshAccessTokenError"
        };
    }
}

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: '98fafdb2e9c04964923e2a55e9d2bfe3', //process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: '35a41711c94c4146be20683e3ccfb714',  //process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL,
        }),
    ],
    secret: 'some_super_secret_value',
    pages: {
        signIn: '../../login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            //initial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000,

                }
            }

            //Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            //Access token has expired, so we need to refresh it...
            // console.log("Access token has expired, refreshing...");
            // console.log("Refresh Token: ", token)
            return await refreshAccessToken(token);
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken,
            session.user.refreshToken = token.refreshToken,
            session.user.username = token.username

            return session;
        }
    }
});
