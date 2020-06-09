import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, TextInput } from "react-native";
// Recoil
import { listsState } from "../service/atoms";
import { useRecoilState } from "recoil";

// Components
import ListItems from "./ListItems";
import ListTitle from "./ListTitle";
import MyBag from "./MyBag";

const URL = "http://localhost:3000";

const List = ({ route }) => {
  const { list } = route.params;
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [lists, setLists] = useRecoilState(listsState);

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

  function removeItem(item) {
    fetch(URL + `/lists/${list.id}/remove`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        item: {
          id: item.id,
        },
      }),
    });
    let index = items.findIndex((i) => i.id === item.id);
    setItems(removeItemAtIndex(items, index));
  }

  function checkItem(item) {
    fetch(URL + `/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        item: {
          checked: true,
        },
      }),
    })
      .then((r) => r.json())
      .then((checkedItem) => {
        let index = items.findIndex((i) => i.id === item.id);
        setItems(prev => replaceItemAtIndex(prev, index, checkedItem));
      });
  }

  function persistChange(ID, title) {
    fetch(URL + `/lists/${ID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        list: {
          name: title,
        },
      }),
    })
      .then((r) => r.json())
      .then((newList) => {
        let index = lists.findIndex((l) => l.id === ID);
        setLists(replaceItemAtIndex(lists, index, newList));
      });
  }

  return (
    <View style={styles.container}>
      <ListTitle name={list.name} ID={list.id} handlePress={persistChange} />
      <ListItems
        items={items.filter((i) => !i.checked)}
        handleDel={removeItem}
        handleCheck={checkItem}
      />
      <MyBag items={items.filter((i) => i.checked)} />
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
    // flex: 1,
    height: 40,
    width: 200,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 2,
    padding: 10,
    margin: 5,
  },
});

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default List;
