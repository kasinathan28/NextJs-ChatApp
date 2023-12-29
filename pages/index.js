import React, { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";

export default function Auth() {
  const { username, secret, setUsername, setSecret } = useContext(Context);
  const router = useRouter();
  function onSubmit(e) {
    e.preventDefault();
    if (username.length === 0 || secret.length === 0) return;
    axios
      .put(
        "https://api.chatengine.io/users/",
        { username, secret },
        { headers: { "Private-key": "593c431c-8f79-4698-ad02-abd9952a5062" } }
      )
      .then((r) => {
        console.log(r);
        router.push('/chats');
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      
      
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">NextJs ChatApp</div>
          <div className="input-container">
            <input
              placeholder="Email"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
            />
            <button type="submit" className="submit-button">
              Login / Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
