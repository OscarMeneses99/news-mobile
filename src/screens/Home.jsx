import React, { useContext } from "react";
import { View, Text } from "react-native";
import Search from "../components/Search.jsx";
import Loading from "../components/Loading.jsx";
import ListOfNews from "../components/ListOfNews.jsx";
import Error from "../components/Error.jsx";
import { NewsContext } from "../context/Context.jsx";

function Home({ navigation }) {
  const { data, loading, error, search } = useContext(NewsContext);

  const { articles } = data;
  return (
    <View>
      <Search />
      {articles?.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 15 }}>
          No results found for
          <Text style={{ fontWeight: "bold" }}> {search}</Text>
        </Text>
      )}

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
