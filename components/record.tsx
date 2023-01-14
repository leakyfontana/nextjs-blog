import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut, getProviders } from "next-auth/react"
import Link from 'next/link';
import useSpotify from '../hooks/useSpotify'
import demoGif from '../public/gifs/recordplayer.gif'

export class Song {
  constructor(name: string, artists: Array<string>, art: string) {
    this.name = name;
    this.artists = artists;
    this.art = art;
  }

  public name: string;
  public artists: Array<string>;
  public art: string;
}

//TODO: Implement npm react-palette

export default function Record() {

  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song>(
    new Song("loading name...", ["loading artists..."], "loading art..."));
  const [currentSongArt, setCurrentSongArt] = useState();
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const [recordColor, setRecordColor] = useState("#064273");
  const [recordLineColor, setRecordLineColor] = useState("#def3f6");

  
  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      setIsPlaying(false);
      if (spotifyApi.getAccessToken()) {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
  
          if (data.statusCode != 204 && data.body.currently_playing_type == "track") {
            
            let tempSong: Song = {
              name: data.body.item.name,
              artists: data.body.item.artists.map(function(item) { 
                return item.name;
              
              }),
              art: data.body.item.album.images[0].url,           
            };

  
            //currentSong.art = data.body.item.album.images[0].url;          
            setCurrentSong(tempSong);
            setCurrentSongArt(data.body.item.album.images[0].url);
  
            setIsPlaying(true);
          }
          else {
            setIsPlaying(false);
          }
        });
      }
      else {
        setIsPlaying(false);
      }
      setIsLoading(false);  
    }
    fetchData();

  }, [session, spotifyApi, setCurrentSong, setCurrentSongArt, setIsPlaying])

  if (session) {
    return(
      <>
        {
          isLoading ? 

         ( <p className='text-2xl text-deep-sea'>Loading...</p> ) : (

          <>
        
          <div className='flex flex-wrap items-center justify-center order-last gap-4 md:-order-1 flex-column'>
            <svg className='w-full rounded-md drop-shadow-xl' viewBox="0 0 400 400">

            <filter id="roughen" x="0" y="0" width="100%" height="100%">
            {/* Noise */}
            <feTurbulence result="noise1" type="turbulence" seed="5" 
                          baseFrequency="0.03 0.01" numOctaves="4" 
                          stitchTiles="stitch" />
            <feTurbulence result="noise2" type="fractalNoise" seed="4" 
                          baseFrequency="0.3 0.05" numOctaves="4" 
                          stitchTiles="stitch" />
            <feTurbulence result="noise3" type="turbulence" seed="3"
                          baseFrequency="0.02 0.005" numOctaves="4" 
                          stitchTiles="stitch" />
            {/* Lightning */}
            <feDiffuseLighting in="noise1" result="lighting1" 
                              surfaceScale="-10" diffuseConstant="0.7">
              <feDistantLight azimuth="225" elevation="45" />
            </feDiffuseLighting>
            <feDiffuseLighting in="noise2" result="lighting2" 
                              surfaceScale="-5" diffuseConstant="0.3">
              <feDistantLight azimuth="225" elevation="75" />
            </feDiffuseLighting>
            <feDiffuseLighting in="noise3" result="lighting3" 
                              surfaceScale="20" diffuseConstant="0.55">
              <feDistantLight azimuth="225" elevation="90" />
            </feDiffuseLighting>
            {/* Blend */}
            <feBlend in="lighting1" in2="lighting2" result="combined1" 
                    mode="overlay" />
            <feBlend in="combined1" in2="lighting3" result="combined2" 
                    mode="overlay" />
            <feBlend in="SourceGraphic" in2="combined2" 
                    mode="overlay" />
          </filter>
            {/* Rectangle */}
          <rect x="0" y="0" width="100%" height="100%" filter="url(#roughen)" fill="#C2B280" />


          <defs>
            <pattern id="image" x="0%" y="0%" height="100%" width="100%"
              viewBox="0 0 200 200">
            <image x="0%" y="0%" width="200" height="200" xlinkHref={currentSongArt} />
            </pattern>
          </defs>


          {
            isPlaying ? 
            (
              <>
                  <g className='origin-center animate-record-spin z-1'>
                    <circle fill={recordColor} r="180" cx="200" cy="200" />
                    <circle fill={recordColor} stroke={recordLineColor} r="160" cx="200" cy="200" />
                    <circle fill={recordColor} stroke={recordLineColor} r="140" cx="200" cy="200" />
                    <circle fill={recordColor} stroke={recordLineColor} r="120" cx="200" cy="200" />
                    <circle fill="url(#image)" cx="200" cy="200" r="65" />  
                    <circle fill='silver' id="dot" cx="200" cy="200" r="4" />
                  </g>
              </>
            )           
            :   
            (
              <>
                <g>
                  <circle className='fill-black' r="180" cx="200" cy="200" />
                  <circle className='fill-black' stroke="#030303" r="140" cx="200" cy="200" strokeWidth="40" />
                  <circle className='fill-black' stroke="#060606" r="100" cx="200" cy="200" strokeWidth="40" />
                  <circle className='fill-black' stroke="#090909" r="60" cx="200" cy="200" strokeWidth="60" /> 
                  <circle fill='silver' id="dot" cx="200" cy="200" r="4" />
                </g>
              </>
              
            )
          }

            </svg>
            <button className='relative' onClick={() => signOut()}>
              <span className='absolute z-10 text-center hover:underline text-deep-sea top-3 left-7'>Sign Out</span>
              <svg className='drop-shadow-xl' viewBox="105.311 289.254 175.846 54.952" width="175.846" height="54.952">
                <defs>
                  <pattern id="pattern-0-0" patternTransform="matrix(1.068461, 0, 0, 1.091886, 114.480534, 303.348586)" xlinkHref="#pattern-0"></pattern>
                  <pattern x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse" viewBox="0 0 100 100" id="pattern-0">
                    <rect x="3.169" y="2.041" width="16.436" height="100.196" fill='#064273' transform="matrix(0, 1, -1, 0, 102.132065, 80.469963)"></rect>
                    <rect x="3.219" y="2.042" width="16.702" height="100.201" fill="#def3f6" transform="matrix(0, 1, -1, 0, 102.299324, 63.599854)"></rect>
                    <rect x="3.219" y="2.042" width="16.702" height="100.201" fill="#def3f6" transform="matrix(0, 1, -1, 0, 102.341942, 30.386934)"></rect>
                    <rect x="3.317" y="2.042" width="17.211" height="100.201" fill="#def3f6" transform="matrix(0, 1, -1, 0, 102.084045, -3.102002)"></rect>
                    <rect x="3.169" y="2.041" width="16.436" height="100.196" fill='#064273'transform="matrix(0, 1, -1, 0, 102.280762, 47.200165)"></rect>
                    <rect x="3.169" y="2.041" width="16.436" height="100.196" fill='#064273' transform="matrix(0, 1, -1, 0, 102.21685, 14.177777)"></rect>
                  </pattern>
                </defs>
                <path d="M 124.185 289.27 L 239.075 289.27 L 239.075 289.327 C 242.424 288.908 246.797 290.296 252.191 293.492 L 270.485 304.329 C 284.715 
                312.758 284.715 321.12 270.485 329.416 L 252.191 340.081 C 246.797 343.226 242.424 344.573 239.075 344.121 L 239.075 344.174 L 124.185 
                344.174 L 124.185 344.142 L 115.996 344.142 C 110.095 344.142 105.311 339.254 105.311 333.223 L 105.311 300.229 C 105.311 294.198 110.095 289.31 
                115.996 289.31 L 124.185 289.31 L 124.185 289.27 Z" strokeWidth="0px" stroke="rgb(218, 131, 85)" paintOrder="stroke" fill="rgb(242, 242, 242)"></path>
                <rect x="131.388" y="300.044" width="100.901" height="33.189" rx="12" ry="12" stroke="rgb(0, 0, 0)" strokeOpacity="0" fill="rgb(5, 33, 99)"></rect>
                <path  fill="rgb(216, 216, 216)" stroke="rgb(215, 215, 215)" d="M 214.672 316.45 L 232.232 316.441"></path>
                <rect x="117.524" y="300.522" width="20.626" height="32.95" rx="8" ry="8" stroke="rgb(0, 0, 0)" strokeOpacity="0" fill="url(#pattern-0-0)" paintOrder="fill"></rect>
                <rect x="130.994" y="299.819" width="83.748" height="33.743" rx="12" ry="12" fill="rgb(216, 216, 216)" stroke="rgb(0, 0, 0)" strokeOpacity="0"></rect>
              </svg>
            </button>
          </div>
          

          {
            isPlaying ? 
            (
              <>
                <div className='flex flex-col gap-5 p-5 rounded-md bg-off-white drop-shadow-xl'>
                  <h2 className='text-3xl'>Now Playing: </h2>
                  <h3 className='text-xl'>{currentSong.name}</h3>
                  <h3 className='text-xl'>By: {currentSong.artists.join(", ")}</h3>
                </div>
              </>
            )           
            :   
            (
              <>
                <div className='flex flex-col gap-5 p-5 rounded-md bg-off-white drop-shadow-xl'>
                  <h2 className='text-2xl'>Not currently playing anything &#128546;</h2>
                  <h2 className='text-2xl'>Open Spotify and play a song!</h2>
                </div>
              </>
              
            )
          }

          </>
          )
        }
      </> 
    )
  }
  return (
    <>
      <div className='flex flex-col items-center md:flex-row md:justify-center gap-7'>
        <Link href="/login">
          <button className='relative order-last py-5'>
            <span className='absolute z-10 text-center hover:underline text-deep-sea top-8 left-9'>Sign In</span>
            <svg className='drop-shadow-xl' viewBox="105.311 289.254 175.846 54.952" width="175.846" height="54.952">
            <defs>
              <pattern id="pattern-0-0" patternTransform="matrix(1.068461, 0, 0, 1.091886, 114.480534, 303.348586)" xlinkHref="#pattern-0"></pattern>
              <pattern x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse" viewBox="0 0 100 100" id="pattern-0">
                <rect x="3.169" y="2.041" width="16.436" height="100.196" fill='#064273' transform="matrix(0, 1, -1, 0, 102.132065, 80.469963)"></rect>
                <rect x="3.219" y="2.042" width="16.702" height="100.201" fill="#def3f6" transform="matrix(0, 1, -1, 0, 102.299324, 63.599854)"></rect>
                <rect x="3.219" y="2.042" width="16.702" height="100.201" fill="#def3f6" transform="matrix(0, 1, -1, 0, 102.341942, 30.386934)"></rect>
                <rect x="3.317" y="2.042" width="17.211" height="100.201" fill="#def3f6" transform="matrix(0, 1, -1, 0, 102.084045, -3.102002)"></rect>
                <rect x="3.169" y="2.041" width="16.436" height="100.196" fill='#064273'transform="matrix(0, 1, -1, 0, 102.280762, 47.200165)"></rect>
                <rect x="3.169" y="2.041" width="16.436" height="100.196" fill='#064273' transform="matrix(0, 1, -1, 0, 102.21685, 14.177777)"></rect>
              </pattern>
            </defs>
            <path d="M 124.185 289.27 L 239.075 289.27 L 239.075 289.327 C 242.424 288.908 246.797 290.296 252.191 293.492 L 270.485 304.329 C 284.715 
            312.758 284.715 321.12 270.485 329.416 L 252.191 340.081 C 246.797 343.226 242.424 344.573 239.075 344.121 L 239.075 344.174 L 124.185 
            344.174 L 124.185 344.142 L 115.996 344.142 C 110.095 344.142 105.311 339.254 105.311 333.223 L 105.311 300.229 C 105.311 294.198 110.095 289.31 
            115.996 289.31 L 124.185 289.31 L 124.185 289.27 Z" strokeWidth="0px" stroke="rgb(218, 131, 85)" paintOrder="stroke" fill="rgb(242, 242, 242)"></path>
            <rect x="131.388" y="300.044" width="100.901" height="33.189" rx="12" ry="12" stroke="rgb(0, 0, 0)" strokeOpacity="0" fill="rgb(5, 33, 99)"></rect>
            <path  fill="rgb(216, 216, 216)" stroke="rgb(215, 215, 215)" d="M 214.672 316.45 L 232.232 316.441"></path>
            <rect x="117.524" y="300.522" width="20.626" height="32.95" rx="8" ry="8" stroke="rgb(0, 0, 0)" strokeOpacity="0" fill="url(#pattern-0-0)" paintOrder="fill"></rect>
            <rect x="130.994" y="299.819" width="83.748" height="33.743" rx="12" ry="12" fill="rgb(216, 216, 216)" stroke="rgb(0, 0, 0)" strokeOpacity="0"></rect>
            </svg>
          </button>
        </Link>
        <div className='flex flex-col gap-5 p-5 rounded-md bg-off-white md:w-6/12 drop-shadow-xl'>
          <h2 className='text-xl'>Try out my custom Spotify-integrated record player!</h2>
          <div className='flex flex-col items-center justify-center gap-3 md:flex-row'>
            <img src="gifs/recordplayer.gif" className='w-full rounded-md md:w-10/12'/>
            <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:w-2/12 md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="block w-12 h-12 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )

}
