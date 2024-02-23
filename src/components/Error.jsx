import React from "react";
import { View, Text, StyleSheet } from "react-native";
function Error(error) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});
export default Error;
