import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import ListItems from "./ListItems";

const MyBag = ({ items }) => {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  function doNothing(item) {
    console.log(item);
  }

  return (
    <View style={open ? styles.openContainer : styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>
          My Bag ({items.length}) -------------------{"  "}
        </Text>
        <TouchableOpacity style={styles.dropDown} onPress={toggleOpen}>
          {open ? <Text>&#9650;</Text> : <Text>&#9660;</Text>}
        </TouchableOpacity>
      </View>
      {open ? (
        <ListItems
          items={items}
          handleDel={doNothing}
          handleCheck={doNothing}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: "green",
  },
  openContainer: {
    flex: 2,
    // borderWidth: 2,
    // borderColor: "red",
  },
  header: {
    margin: 10,
    textAlign: "left",
    width: "80%",
    flex: 1,
    flexDirection: "row",
    // borderWidth: 2,
  },
  label: {
    fontSize: 20,
  },
  dropDown: {
    fontSize: 20,
    paddingTop: 5,
    // borderWidth: 2
  },
});

export default MyBag;

// &#9660;
// &#9650;
