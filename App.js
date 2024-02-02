import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home";
import Details from "./src/screens/Details";

const options = {
  home: {
    title: "News Mobile 🌎",
    headerStyle: {
      backgroundColor: "#202020",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#fff",
    },
    contentStyle: {
      backgroundColor: "#fff",
    },
  },
  details: {
    title: "Detalles",
    headerBackTitle: "Atrás",
    headerStyle: {
      backgroundColor: "#202020",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#fff",
    },
    contentStyle: {
      backgroundColor: "#fff",
    },
  },
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={options.home}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={options.details}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
