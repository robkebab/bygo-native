import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import ListItems from "./ListItems";
// import { useRecoilState } from "recoil";


const MyBagPage = ({ route }) => {
//   const [allItems, setAllItems] = useRecoilState(itemsState)
  const { items } = route.params;
  return (
    <View style={styles.container}>
      <ListItems items={items} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.empty}>Empty</Text>
      </TouchableOpacity>
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
  button: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 20,
  },
  empty: {
    color: "red",
  },
});

export default MyBagPage;
