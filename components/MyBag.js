import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const MyBag = ({ items }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        My Bag ({items.length}) ------------------------{"   "}
      </Text>
      <TouchableOpacity style={styles.dropDown}>
        <Text>&#9660;</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    textAlign: "left",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    // borderWidth: 2,
  },
  label: {
    paddingLeft: 10,
    fontSize: 20,
  },
  dropDown: {
      fontSize: 20,
  }
});

export default MyBag;

// &#9660;
// &#9650;
