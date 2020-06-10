import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
// Recoil
import { listsState } from "../service/listsState";
import { itemsState } from "../service/itemsState";
import {atom, useRecoilState } from "recoil";

// Components
import ItemInput from './ItemInput'
import ListItems from "./ListItems";
import MyBagFooter from "./MyBagFooter";
// import ListTitle from "./ListTitle";

const URL = "http://localhost:3000";


const List = ({navigation, route }) => {
  const { list } = route.params;
  const [items, setItems] = useRecoilState(itemsState);
  const [lists, setLists] = useRecoilState(listsState);

  useEffect(getListItems, []);

  function getListItems() {
    fetch(URL + `/lists/${list.id}/items`)
      .then((r) => r.json())
      .then((j) => setItems(j));
  }

  function addItem(newItem, temp) {
    fetch(URL + `/lists/${list.id}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        item: {
          name: newItem,
          temp
        },
      }),
    })
      .then((r) => r.json())
      .then((item) => setItems([...items, item]));
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

  function toggleChecked(item) {
    fetch(URL + `/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        item: {
          checked: !item.checked,
        },
      }),
    })
      .then((r) => r.json())
      .then((checkedItem) => {
        let index = items.findIndex((i) => i.id === item.id);
        setItems((prev) => replaceItemAtIndex(prev, index, checkedItem));
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
      {/* <ListTitle name={list.name} ID={list.id} handlePress={persistChange} /> */}
      <ItemInput addItem={addItem}/>
      <ListItems
        items={items.filter((i) => !i.checked)}
        handleDel={removeItem}
        handleCheck={toggleChecked}
      />
      <MyBagFooter
        items={items.filter((i) => i.checked)}
        navigation={navigation}
      />
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
  
});

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default List;
