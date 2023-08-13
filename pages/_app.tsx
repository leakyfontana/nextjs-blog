import '../styles/global.css'
import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Heebo } from "next/font/google"

const heebo = Heebo({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return ( 
        <SessionProvider session={pageProps.session}>
            <main className={heebo.className}> 
                <Component {...pageProps} />
            </main>
        </SessionProvider>
    )
}
