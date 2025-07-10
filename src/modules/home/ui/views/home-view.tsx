"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col p-4 gap-y-4">
      <div className="flex flex-col space-y-4 items-center justify-center min-h-screen">
        <h1 className="text-center text-7xl">hello ACHU🌏❤️</h1>
        <p>
          Logged in as{" "}
          <span className="font-extrabold uppercase text-xl border-2 border-accent-foreground px-2">
            {session.user.name}
          </span>
        </p>
        <Button
          variant="destructive"
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in");
                },
              },
            })
          }
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};
