import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import ListItems from "./ListItems";

const URL = "http://localhost:3000";

const List = ({ route }) => {
  const { list } = route.params;
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");


  const [title, setTitle] = useState(list.name);
  const [titleEdit, setTitleEdit] = useState(false);

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

  function editTitle() {
    setTitleEdit(!titleEdit);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onLongPress={editTitle}>
        {titleEdit ? (
          <>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTitle(text)}
            defaultValue={title}
          ></TextInput>
          <Button title="+" onPress={editTitle}/>
          </>
        ) : (
          <Text>{title}</Text>
        )}
      </TouchableOpacity>
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
