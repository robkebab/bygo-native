import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import LoginPage from "./components/LoginPage";
import MyListsPage from "./components/MyListsPage";

const URL = "http://localhost:3000";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
    <View style={styles.container}>
      {console.log(currentUser)}
      {loggedIn ? (
        <MyListsPage handlePress={logOut} userID={currentUser.id}/>
      ) : (
        <LoginPage handleSubmit={logIn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
