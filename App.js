import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./components/LoginPage";

export default function App() {
  const [message, setMessage] = useState("yo");
  const [loggedIn, setLoggedIn] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(getUsers, []);
  
  function getUsers() {
    fetch("http://localhost:3000/")
    .then(r => r.json())
    .then(j => setMessage(j.message))
  };

  function logIn(email, password) {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
          user: {
              email,
              password,
              password_confirmation: password
          }
      })
    })
    .then(r => r.json())
    .then(j => {setLoggedIn(true); setCurrentUser(j.message)});
  }

  return (
    <View style={styles.container}>
      {loggedIn ? <Text>{message}</Text> : <LoginPage handleSubmit={logIn}/>}
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
