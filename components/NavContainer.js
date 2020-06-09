import React from "react";

// Components
import MyListsPage from "./MyListsPage";
import List from "./List";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const NavContainer = ({ logOut, currentUser }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My Lists">
          {(props) => (
            <MyListsPage
              {...props}
              userID={currentUser.id}
              handlePress={logOut}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavContainer;
