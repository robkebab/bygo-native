import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";

export default function ItemInput({ addItem }) {
  const [newItem, setNewItem] = useState("");
  const [adding, setAdding] = useState(false);

  return (
    <>
      {adding ? (
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
              setAdding(prev => !prev)
            }}
          ></Button>
        </View>
      ) : (
        <View style={styles.addCont}>
          <TouchableOpacity style={styles.toggleAdd} onPress={() => setAdding(prev => !prev)}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
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
  toggleAdd: {
    position: "relative",
    textAlign: "center",
    backgroundColor: "#00ccff",
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  plus: {
    position: "absolute",
    bottom: .3,
    left: 7.5,
    fontSize: 40,
    color: "white",
  },
});
