import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
} from "react-native";

const ListItems = ({ items, handleDel }) => {
  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.li}>
        <TouchableOpacity>
          <Text style={styles.delButton} onPress={() => handleDel(item)}>
            X
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 400,
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

export default ListItems;
