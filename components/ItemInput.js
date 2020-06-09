import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

export default function ItemInput({addItem}) {
  const [newItem, setNewItem] = useState("");

  return (
    <View style={styles.addCont}>
      <TextInput
        style={styles.input}
        placeholder="Add an item"
        onChangeText={(text) => setNewItem(text)}
        defaultValue={newItem}
      />
      <Button
        title="Add"
        onPress={() => {
          addItem(newItem);
          setNewItem("");
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    // flex: 1,
    height: 40,
    width: 200,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 2,
    padding: 10,
    margin: 5,
  },
  addCont: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    // borderWidth: 2,
    // borderColor: "green"
  },
});
