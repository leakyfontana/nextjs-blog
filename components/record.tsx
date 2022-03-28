import React, { useEffect, useState } from 'react'
import Turntable from './turntable';
import styles from './record.module.css'
import { useSession, signIn, signOut, getProviders } from "next-auth/react"
import Link from 'next/link';
import useSpotify from '../hooks/useSpotify'
import renderTurntable from './turntable';



export default function Record() {
  const svgString = "" //renderTurntable();

  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentSong, setCurrentSong] = useState();
  const [currentSongArt, setCurrentSongArt] = useState();
  const [isPlaying, setIsPlaying] = useState<boolean>();
  
  useEffect(() => {
    setIsPlaying(false);
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        if (data.body) {
          setCurrentSong(data.body.item.name);
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
  }, [session, spotifyApi,])

  console.log(currentSong);
  //console.log(currentSongArt);
  console.log(isPlaying);

  //style={{backgroundImage: `url("data:image/svg+xml,${svgString}")`}}

  if (session) {
    return(
      <>
        <svg className={styles.turntable}  viewBox="0 0 400 400">

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

            <g className={styles.record}>
              <circle className={styles.disk} r="180" cx="200" cy="200" />
              <circle className={styles.line} r="160" cx="200" cy="200" />
              <circle className={styles.line} r="140" cx="200" cy="200" />
              <circle className={styles.line} r="120" cx="200" cy="200" />
              <circle fill="url(#image)" cx="200" cy="200" r="65" />  
              <circle fill='silver' id="dot" cx="200" cy="200" r="4" />
            </g>
          </>
        )           
        :   
        (
          <>
            <g className={styles.record}>
              <circle className={styles.pad} r="180" cx="200" cy="200" />
              <circle className={styles.padLine} stroke="#030303" r="140" cx="200" cy="200" strokeWidth="40" />
              <circle className={styles.padLine} stroke="#060606" r="100" cx="200" cy="200" strokeWidth="40" />
              <circle className={styles.padLine} stroke="#090909" r="60" cx="200" cy="200" strokeWidth="60" /> 
              <circle fill='silver' id="dot" cx="200" cy="200" r="4" />
            </g>
          </>
          
        )
      }

        </svg>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <Link href="/login">
        <button>Log in</button>
      </Link>
    </>
  )

}
