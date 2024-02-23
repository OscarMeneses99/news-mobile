import React from "react";
import { View } from "react-native";
import useFetch from "../hooks/useFetch.js";
import Loading from "../components/Loading.jsx";
import ListOfNews from "../components/ListOfNews.jsx";
import Error from "../components/Error.jsx";

function Home({ navigation }) {
  const { data, loading, error } = useFetch();
  const { articles } = data;
  return (
    <View>
      {loading ? (
        <Loading />
      ) : (
        <ListOfNews
          articles={articles}
          navigation={navigation}
        />
      )}
      {error && <Error error={error} />}
    </View>
  );
}

export default Home;
