import React, {useState, useEffect} from 'react';
import MyLists from './MyLists';
import {Button, StyleSheet, Text, View } from "react-native";

const URL = "http://localhost:3000";

const MyListsPage = ({handlePress, userID, navigation}) => {
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
            <Button title="Add List" />
            <MyLists lists={lists} navigation={navigation}></MyLists>
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

export default MyListsPage;