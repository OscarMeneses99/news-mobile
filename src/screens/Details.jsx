import React from "react";
import { View, Text, Button, Linking, StyleSheet } from "react-native";
import Image from "../components/Image";

const Details = ({ route }) => {
  const { article } = route.params;
  const { title, content, urlToImage, author, publishedAt, url } = article;

  const openUrl = () => {
    Linking.openURL(url);
  };

  const formatedDate = new Date(publishedAt).toLocaleDateString();

  return (
    <View style={styles.conteiner}>
      <Text style={styles.title}>{title}</Text>
      <Image article={article} />
      <Text style={styles.date}>
        {author} | {formatedDate}
      </Text>
      <Text style={styles.content}>{content}</Text>
      <Button
        title="Read more"
        onPress={openUrl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    borderRadius: 10,
  },
  date: {
    marginBottom: 8,
    color: "gray",
  },
  content: {
    marginBottom: 16,
  },
});

export default Details;
