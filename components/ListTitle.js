import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

const URL = "http://localhost:3000";

const ListTitle = ({ name, ID }) => {
  const [title, setTitle] = useState(name);
  const [titleEdit, setTitleEdit] = useState(false);

  function editTitle() {
    setTitleEdit(!titleEdit);
  }

  function persistChange() {
    fetch(URL + `/lists/${ID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        list: {
          name: title,
        },
      }),
    });
  }

  return (
    <TouchableOpacity onLongPress={editTitle}>
      {titleEdit ? (
        <>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTitle(text)}
            defaultValue={title}
          ></TextInput>
          <Button
            title="+"
            onPress={() => {
              editTitle();
              persistChange();
            }}
          />
        </>
      ) : (
        <Text>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 2,
    padding: 10,
    margin: 5,
  },
});

export default ListTitle;
