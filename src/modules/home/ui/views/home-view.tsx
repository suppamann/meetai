"use client";

import { authClient } from "@/lib/auth-client";

export const HomeView = () => {
  const user = authClient.useSession();
  console.log({ user });
  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <p className="text-2xl">
        Welcome{" "}
        <span className="text-[#c1c41c] font-semibold capitalize text-4xl">
          {user.data?.user.name}!!
        </span>
      </p>
    </div>
  );
};
