import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

function Card({ article, navigation }) {
  return (
    <View style={styles.card}>
      <Image
        source={
          article. urlToImage === null
            ? "./assets/noimage.jpg"
            : { uri: article.urlToImage }
        }
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.description}>{article.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Details", { article })}
        >
          <Text style={styles.buttonText}>Ver Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 20,
    width: 350,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
    fontSize: 15,
    color: "#555",
  },
  button: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Card;