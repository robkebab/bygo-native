import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

const LoginPage = ({handleSubmit}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text>bygo</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={(text) => setEmail(text)}
        defaultValue={email}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
        defaultValue={password}
      />
      <Text>{email}</Text>
      <Text>{password}</Text>
      <Button onPress={() => handleSubmit(email, password)} title="Log In" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 2,
    padding: 10,
    margin: 5,
  },
});

export default LoginPage;

