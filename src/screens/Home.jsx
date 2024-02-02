import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Details")}>
        <Text>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
