"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("null");

  const onSubmit = () =>{
    authClient.signUp.email({
      email,
      password,
      name
    },{
      onError: (e) => alert(e.error.message),
      onSuccess: () => alert("Good to Go🏇🏿💰")
    }

  )
  }

  return (
    <main className="min-h-screen justify-center items-center flex flex-col space-y-7">
      <div className="font-extrabold">HELLO ACHU🌏❤️</div>
      <div className="space-y-2.5">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button className="" onClick={onSubmit}>I Love You Achu❤️</Button>
    </main>
  );
}
