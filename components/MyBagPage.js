import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MyBagPage = () => {
    return (
        <View style={styles.container}>
            <Text>My BAG</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
    },
  });

export default MyBagPage
