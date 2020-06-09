import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const URL = "http://localhost:3000";

const MyBagFooter = ({ items, navigation}) => {
  const [open, setOpen] = useState(false);

  function viewMyBag(){
    navigation.navigate("My Bag", {
      items,
    })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={viewMyBag} >
        <MaterialCommunityIcons style={styles.icon} name="bag-personal"/>
        <Text style={styles.label}>
          My Bag ({items.length})
        </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
    // borderWidth: 2,
    // borderColor: "blue",
  },
 
  label: {
    fontSize: 20,
    padding: 10,
    marginBottom: 20
  },
  icon: {
    fontSize: 26,
    paddingBottom: 10,
    marginBottom: 20
  },
});

export default MyBagFooter;

// &#9660;
// &#9650;
