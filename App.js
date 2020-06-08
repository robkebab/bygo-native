import React, { useEffect, useState } from "react";
import NavContainer from "./components/NavContainer";
import LoginPage from "./components/LoginPage";
// Recoil
import { RecoilRoot } from "recoil";

const URL = "http://localhost:3000";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [dbChange, setDbChange] = useState(null);

  // useEffect(isUser, []);

  // function isUser() {
  //   fetch(URL + "/sessions")
  //   .then(r => r.json())
  //   .then(j => setUser(j) )
  // };

  function setUser(u) {
    setCurrentUser(u);
    setLoggedIn(true);
  }

  function delUser() {
    setLoggedIn(false);
    setCurrentUser(null);
  }

  function logIn(email, password) {
    fetch(URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          email,
          password,
          password_confirmation: password,
        },
      }),
    })
      .then((r) => r.json())
      .then((j) => setUser(j));
  }

  function logOut() {
    fetch(URL + "/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((j) => j.message && delUser());
  }

  return (
    <>
      {!loggedIn ? (
        <LoginPage handleSubmit={logIn} />
      ) : (
        <RecoilRoot>
          <NavContainer logOut={logOut} currentUser={currentUser}/>
        </RecoilRoot>
      )}
    </>
  );
}
