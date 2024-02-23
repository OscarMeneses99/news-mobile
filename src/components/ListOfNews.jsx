import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Card from "./Card";

function ListOfNews({ articles, navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Card
        article={item}
        navigation={navigation}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 10,
  },
  item: {
    marginBottom: 10,
  },
});

export default ListOfNews;
