import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// Recoil
import { listsState } from "../service/listsState";
import { useRecoilState } from "recoil";

// Components
import MyLists from "./MyLists";

const URL = "http://localhost:3000";

const MyListsPage = ({ handlePress, userID, navigation }) => {
  const [lists, setLists] = useRecoilState(listsState);

  useEffect(getLists, []);

  function getLists() {
    fetch(URL + `/users/${userID}/lists`)
      .then((r) => r.json())
      .then((j) => setLists(j));
  }

  function addList() {
    let newList;
    fetch(URL + "/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        list: {
          name: "New List",
          user_id: userID,
        },
      }),
    })
      .then((r) => r.json())
      .then((list) => {
        setLists([...lists, list]);
        navigation.navigate("List", {
          list
        });
      });
  }

  function deleteList(ID) {
    fetch(URL + `/lists/${ID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    let index = lists.findIndex(l => l.id === ID)
    setLists(removeItemAtIndex(lists, index))
  }

  return (
    <View style={styles.container}>
      <Button title="Add List" onPress={addList} />
      <MyLists lists={lists} navigation={navigation} handleDel={deleteList}></MyLists>
      <Button title="Log Out" onPress={handlePress} />
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

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default MyListsPage;
