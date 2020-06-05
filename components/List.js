import React, {useState, useEffect} from "react";
import { View, Button, StyleSheet, Text, FlatList } from "react-native";
import ListItems from './ListItems'

const URL = "http://localhost:3000";

const List = ({ route }) => {
  const { list } = route.params;
  const [items, setItems] = useState([]);

  useEffect(getListItems, [])

  function getListItems() {
    fetch(URL + `/lists/${list.id}/items`)
    .then(r => r.json())
    .then(j => setItems(j))
  }

  return (
    <View style={styles.container}>
      <Text>{list.name}</Text>
      <ListItems items={items} />
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

export default List;
