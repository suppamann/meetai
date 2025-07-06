import SignInView from "@/modules/auth/ui/views/sing-in-view";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

// cant access sign-in/ sign-up if logged in(localhost:3000/)--> protected routes
  if(!!session) redirect("/")

  return <SignInView/>
};

export default Page;