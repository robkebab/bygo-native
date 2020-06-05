import React, { useEffect, useState } from "react";
// import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./components/LoginPage";
import MyListsPage from "./components/MyListsPage";
import List from "./components/List";

const URL = "http://localhost:3000";

const Stack = createStackNavigator();

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
    <>
      {!loggedIn ? (
        <LoginPage handleSubmit={logIn} />
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="My Lists">
              {(props) => (
                <MyListsPage
                  {...props}
                  userID={currentUser.id}
                  handlePress={logOut}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="List" component={List} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
