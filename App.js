import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./components/LoginPage";

export default function App() {
  const [message, setMessage] = useState("yo");

  useEffect(getUsers, []);
  
  function getUsers() {
    fetch("https://still-basin-20566.herokuapp.com/")
    .then(r => r.json())
    .then(j => setMessage(j.message))
  };

  return (
    <View style={styles.container}>
      <LoginPage />
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
