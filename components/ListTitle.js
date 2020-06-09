import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

const URL = "http://localhost:3000";

const ListTitle = ({ name, ID, handlePress }) => {
  const [title, setTitle] = useState(name);
  const [titleEdit, setTitleEdit] = useState(false);

  function editTitle() {
    setTitleEdit(!titleEdit);
  }

  return (
    <TouchableOpacity style={styles.container} onLongPress={editTitle}>
      {titleEdit ? (
        <View style={styles.inputCont}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTitle(text)}
            defaultValue={title}
          ></TextInput>
          <Button
            title="+"
            onPress={() => {
              editTitle();
              handlePress(ID, title);
            }}
            style={styles.addButton}
          />
        </View>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderBottomWidth: 2
  },
  title: {
    fontSize: 20,
  },
  inputCont: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 2,
    padding: 10,
    margin: 5,
  },
  addButton: {
    borderWidth: 2,
  }
});

export default ListTitle;
