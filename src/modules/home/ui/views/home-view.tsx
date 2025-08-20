"use client";

import { authClient } from "@/lib/auth-client";
interface Props{
  username: string;
}

export const HomeView = ({username}:Props) => {
  const user = authClient.useSession();
  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <p className="text-2xl">
        Welcome{" "}
        <span className="text-[#c1c41c] font-semibold capitalize text-4xl">
          {username}!!
        </span>
      </p>
    </div>
  );
};
