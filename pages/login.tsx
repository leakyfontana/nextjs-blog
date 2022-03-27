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
    console.log(providers)

    return (
        <div>
            {/* <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt=""/> */}

            {Object.values(providers).map((provider: Provider) => (
                <div key={provider.name}>
                    <button
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