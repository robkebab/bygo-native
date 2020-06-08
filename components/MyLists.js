import React from "react";
import { TouchableOpacity, StyleSheet, Text, FlatList } from "react-native";

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
          <Text style={styles.delButton}>X</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={lists}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
  },
  li: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
    fontSize: 20,
    width: 300,
    borderWidth: 2,
    borderColor: "blue",
    padding: 5,
    margin: 5,
  },
  text: {
    margin: 5,
  },
  delButton: {
    margin: 5,
  },
});

export default MyLists;
