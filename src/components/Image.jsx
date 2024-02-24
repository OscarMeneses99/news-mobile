import React from "react";
import { Image, View, StyleSheet } from "react-native";
function Images({ article }) {
  return (
    <View>
      {article.urlToImage === null ? (
        <Image
          source={require("../../assets/noimage.jpg")}
          style={styles.image}
        />
      ) : (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Images;
