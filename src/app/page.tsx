import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/home/ui/views/home-view";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  //no session and hit localhost:3000 directly then route to sign-in
  if (!session) {
    redirect("/sign-in");
  }

  return <HomeView />;
};

export default Page;
