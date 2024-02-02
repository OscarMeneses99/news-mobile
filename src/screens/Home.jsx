import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Card from "../components/Card";
import { getNews } from "../services/api";

function Home({ navigation }) {
  const [data, setData] = useState({});
  useEffect(() => {
    getNews()
      .then((response) => setData(response))
      .catch((error) => console.error(error));
  }, []);

  const { articles } = data;

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

export default Home;
