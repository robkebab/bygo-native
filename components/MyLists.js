import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Button,
} from "react-native";

const MyLists = ({ navigation, lists, handleDel }) => {
  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.li}
        onPress={() =>
          navigation.navigate("List", {
            list: item,
          })
        }
      >
        <TouchableOpacity onPress={() => handleDel(item.id)}>
          <Text style={styles.delButton}>+</Text>
        </TouchableOpacity>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList style={styles.container} data={lists} renderItem={renderItem} />
  );
};

const styles = StyleSheet.create({
  container: {},
  li: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    width: 300,
    borderWidth: 2,
    borderColor: "blue",
    padding: 5,
    margin: 5,
  },
  delButton: {
    fontSize: 20
  }
});

export default MyLists;
