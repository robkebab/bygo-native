import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  TextInput,
} from "react-native";
import ListItems from "./ListItems";
import ListTitle from "./ListTitle";

const URL = "http://localhost:3000";

const List = ({ route }) => {
  const { list } = route.params;
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");


  

  useEffect(getListItems, []);

  function getListItems() {
    fetch(URL + `/lists/${list.id}/items`)
      .then((r) => r.json())
      .then((j) => setItems(j));
  }

  function addItem() {
    fetch(URL + `/lists/${list.id}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        item: {
          name: newItem,
        },
      }),
    })
      .then((r) => r.json())
      .then((item) => setItems([...items, item]));
    setNewItem("");
  }

  return (
    <View style={styles.container}>
      <ListTitle name={list.name} ID={list.id} />
      <ListItems items={items} />
      <TextInput
        style={styles.input}
        placeholder="Add an item"
        onChangeText={(text) => setNewItem(text)}
        defaultValue={newItem}
      />
      <Button title="Add" onPress={addItem}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
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

export default List;
