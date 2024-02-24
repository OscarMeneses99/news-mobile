import React, { useContext } from "react";
import { NewsContext } from "../context/Context";
import { View, Text, TextInput, StyleSheet } from "react-native";
function Search() {
  const { search, setSearch, fetchData } = useContext(NewsContext);

  async function handleEnterPress() {
    await fetchData();
  }

  return (
    <View style={styles.conteiner}>
      <Text style={styles.text}>Search for topics of interest</Text>
      <TextInput
        style={styles.input}
        onChangeText={(inputText) => setSearch(inputText)}
        value={search}
        placeholder="Technology, Sports, Science..."
        onSubmitEditing={handleEnterPress}
        returnKeyType="done"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  input: {
    height: 50,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
export default Search;
