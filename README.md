# Documentación

Para esta prueba decidí hacerla en el entorno de desarrollo de Expo, ya que simplifica el desarrollo de aplicaciones móviles con React Native.

## Creación del proyecto

Ejecute el siguiente comando en su terminal:

```bash
npx create-expo-app
```

Según las instrucciones, el proyecto deberá llamarse "news-mobile".

## Ejecutar app

Ejecute el siguiente comando en su terminal:

```bash
npx expo start
```

Para poder visualizar los cambios en tiempo real de nuestra aplicación, es recomendable descargar en su tienda de aplicaciones (Play Store/App Store) la aplicación llamada Expo Go.

Abra su cámara y capture el código QR que aparece en la terminal cuando el proyecto esté ejecutándose.

## Añadir un Router a la aplicación

Utilizaremos React Navigation. Para obtener más información, visite la documentación en: https://reactnavigation.org/docs/getting-started/

Se necesitarán las siguientes dependencias:

```bash
npm install @react-navigation/native
```

En nuestro caso, como estaremos utilizando Expo, necesitamos instalar las siguientes dependencias complementarias de la siguiente forma:

```bash
npx expo install react-native-screens react-native-safe-area-context
```

En el punto de entrada de nuestra aplicación, que es App.js, usaremos el NavigationContainer:

```react
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```

De esta forma, envolvemos toda nuestra aplicación.

Por último, necesitamos otra dependencia que nos ayudará en el router de nuestra aplicación, que es la siguiente:

```bash
npm install @react-navigation/native-stack
```

Podemos declarar una constante:

```code
const Stack = createNativeStackNavigator();
```

Esto devuelve 2 objetos que son el Navigation y Screen, con ellos podemos declarar las rutas de nuestra aplicación y el componente a renderizar de la siguiente forma:

```code
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Details"
          component={Details}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Obtener token de la API

Cree una cuenta en https://newsapi.org/ el cual le otorgará un token para poder usar el servicio.

Por motivos de seguridad y buenas prácticas, comience guardando este token en una variable de entorno.

En la ruta raíz del proyecto, cree un archivo .env y guarde el token de la siguiente forma:

```code
NEWS_API_KEY=your_api_key
```

## Variables de entorno

Para acceder a las variables de entorno, se deberá instalar dotenv y expo-constants de la siguiente forma:

```bash
npm install dotenv expo-constants
```

Cree un archivo en la raíz del proyecto llamado app.config.js.

Dentro deberá incluir esta configuración:

```code
import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
});
```

Por último, asegúrese de agregar el .env en el archivo .gitignore para no subir el token a algún repositorio de GitHub.

## Consumo de la API

Cree una carpeta llamada services con el archivo api.js

En la siguiente función hacemos una llamada a una URL con el token para obtener las noticias:

```code
import Constants from "expo-constants";
const NEWS_API_KEY = Constants.expoConfig.extra.NEWS_API_KEY;

const API_URL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${NEWS_API_KEY}`;

export async function getNews() {
  const response = await fetch(API_URL);
  return await response.json();
}
```

## Componente Card

Cree un archivo Card.jsx en la carpeta components.

Este recibirá como props los articles de todas las noticias, la cual deberá renderizar:

<ul>
  <li>Image</li>
  <li>Title</li>
  <li>Description</li>
  <li>Button</li>
</ul>

La construcción del componente es la siguiente:

```code
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
```

En el JSON hay algunos artículos que no contienen imagen. Para esto, hice una ternaria para que en el caso de que la imagen tenga un valor null ponga una imagen que dice "no photo".

También recibe esta Card el objeto navigation para poder ir a la pantalla de Detalles, y a su vez le mandamos el objeto article.

## Renderizar una Lista de Artículos

Primero obtenemos la lista de artículos desde la API de la siguiente manera.

```code
  const [data, setData] = useState({});
  useEffect(() => {
    getNews()
      .then((response) => setData(response))
      .catch((error) => console.error(error));
  }, []);

  const { articles } = data;
```

Para que el rendimiento de la aplicación sea bueno, se usará FlatList ya que nos permite renderizar una lista con scroll.

Queda de la siguiente manera:

```code
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
```

Donde renderItem es cada una de las Cards

```code
 const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Card
        article={item}
        navigation={navigation}
      />
    </View>
  );
```

### Pantalla de detalles

Por último, en la pantalla de detalles nos hace falta presentar la siguiente información:

<ul>
  <li>Image</li>
  <li>Title</li>
  <li>Source</li>
  <li>Date</li>
  <li>Content</li>
  <li>Link</li>
</ul>

En la respuesta de la API, la propiedad content no presenta toda la información en texto, por lo que se le agregará un enlace que lleve a la web para poder visualizar la noticia completa.

Recuerde que recibimos como prop en la ruta de detalles el objeto article por lo tanto podemos recuperarlo de la siguiente manera:

```code
const Details = ({ route }) => {
  const { article } = route.params;
}
```

En esta parte cree una función que nos permita abrir la URL en el navegador del dispositivo para visitar la fuente de la noticia.

```code
  const openUrl = () => {
    Linking.openURL(url);
  };
```

Se puede dar formato a la fecha de publicación de la siguiente forma:

```code
const formatedDate = new Date(publishedAt).toLocaleDateString();
```

Por último, presentamos la siguiente información de la siguiente forma:

```code
    <View style={styles.conteiner}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={{ uri: urlToImage }}
        style={styles.image}
      />
      <Text style={styles.date}>
        {author} | {formatedDate}
      </Text>
      <Text style={styles.content}>{content}</Text>
      <Button
        title="Read more"
        onPress={openUrl}
      />
    </View>
```

### pre-Build

Expo nos permite hacer una pre-Build de nuestra app para iOS/Android. Ejecute el siguiente comando:

```bash
npx expo prebuild
```
