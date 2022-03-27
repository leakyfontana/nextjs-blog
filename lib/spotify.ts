import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-email", 
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read"
    // "user-library-modify"
].join(',');

const params = {
    scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: '98fafdb2e9c04964923e2a55e9d2bfe3', //process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: '35a41711c94c4146be20683e3ccfb714',//process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };