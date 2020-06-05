import React from 'react';
import {View, Button, StyleSheet, Text, FlatList } from "react-native";


const List = ({route}) => {
    const {list} = route.params
    
    return (
        <View>
            <Text>{list.name}</Text>
        </View>
    );
};

export default List;