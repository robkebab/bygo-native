import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import ListItems from "./ListItems";

import { itemsState } from "../service/itemsState";
import { useRecoilState } from "recoil";

const MyBagPage = () => {
  const [allItems, setAllItems] = useRecoilState(itemsState);

  function emptyBag() {
    setAllItems((prev) => prev.map((item) => ({ ...item, checked: false })));
  }
  return (
    <>
      {allItems.filter((i) => i.checked).length === 0 ? (
        <View style={styles.noItems}>
          <Text>Your Bag Is Empty</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <ListItems items={allItems.filter((i) => i.checked)} />
          <TouchableOpacity style={styles.button} onPress={emptyBag}>
            <Text style={styles.empty}>Empty</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  noItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
