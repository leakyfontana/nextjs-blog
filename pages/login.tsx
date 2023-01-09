import { getProviders, signIn } from "next-auth/react";
import utilStyles from '../styles/utils.module.css'

interface Provider {
    id: string,
    name: string,
    type: string, 
    signinUrl: string,
    callbackUrl: string,
}

function Login( {providers} )  {

    return (
        <div className='flex flex-col items-center justify-center w-screen min-h-screen bg-black felx-col'>
            <img className="mb-5 w-52" src="images/spotify.png" alt=""/> 

            {Object.values(providers).map((provider: Provider) => (
                <div key={provider.name}>
                    <button className='bg-[#1AB26B] text-xl text-white p-3 rounded-full'
                    onClick={() => signIn(provider.id, {callbackUrl: "/"})}
                    >Login with {provider.name}</button>
                </div>
            ))}

            <button>{providers[0]}</button>
        </div>
    );
}

export default Login;

export async function getServerSideProps(context) {
    const providers = await getProviders();

    return {
        props: { providers },
      }
}