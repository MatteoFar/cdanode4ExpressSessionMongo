import React, { useState } from "react";
import { useCookies } from "react-cookie";
import apiService from "../../service";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const m = await apiService.postLogin({ email, password });

    console.log(m);
  };

  return (
    <div>
      <h1>CONNEXION</h1>
      <input onChange={(e) => setEmail(e.target.value)} type="email"></input>
      <input onChange={(e) => setPassword(e.target.value)} type="password" />
      <button onClick={handleLogin} type="button">
        Connexion
      </button>
    </div>
  );
}
