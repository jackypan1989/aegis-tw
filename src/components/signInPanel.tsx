import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { useState } from "react"

const SignInPanel = () => {  
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<any>()
  )

  return <Auth
    supabaseClient={supabaseClient}
    providers={['google', 'facebook', 'github']}
    socialLayout='vertical'
    onlyThirdPartyProviders={true}
    redirectTo={`${process.env.NEXT_PUBLIC_URL}/community`}
    appearance={{ theme: ThemeSupa }}
  />
}

export default SignInPanel