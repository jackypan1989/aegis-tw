import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { Auth } from "@supabase/ui"

const SignInPanel = () => {  
  return <Auth
    supabaseClient={supabaseClient}
    providers={['google', 'facebook', 'github']}
    socialLayout='vertical'
    socialButtonSize='medium'
    socialColors={true}
    onlyThirdPartyProviders={true}
    redirectTo={process.env.NEXT_PUBLIC_URL}
  />
}

export default SignInPanel