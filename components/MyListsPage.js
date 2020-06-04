import React, {useState, useEffect} from 'react';
import MyLists from './MyLists';
import {Button, StyleSheet, Text, View } from "react-native";

const URL = "http://localhost:3000";

const MyListsPage = ({handlePress, userID}) => {
  const [lists, setLists] = useState([])

  useEffect(getLists, [])

  function getLists() {
    fetch(URL + `/users/${userID}/lists`)
    .then(r => r.json())
    .then(j => setLists(j))
  }

  // function addList() {
  //   fetch(URL + '/lists', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({

  //     })
  //   })
  // }
    return (
        <View style={styles.container}>
            <Text>My Lists</Text>
            <Button title="Add List" />
            <MyLists style={styles.listContainer} lists={lists} ></MyLists>
            <Button title="Log Out" onPress={handlePress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      marginTop: 30,
      alignItems: "center",
      justifyContent: "flex-start",
    },
  });

export default MyListsPage;