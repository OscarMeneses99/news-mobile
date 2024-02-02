# Documentación

Para esta prueba decidi hacerla en el entorno de desarrollo de expo ya que simplifica el desarrollo de aplicaciones móviles con React Native.

## Creación del proyecto

Ejecute el siguiente comando en su terminal:

```bash
npx create-expo-app
```

Segun las instrucciones, se debera llamar al proyecto <strong>news-mobile</strong>

## Ejecutar app

Ejecute el siguiente comando en su terminal:

```bash
npx expo start
```

Para poder visualizar los cambios en tiempo real de nuestra aplicación es recomendable descargar en su tienda de aplicaciones PlayStore/AppStore la aplicación llamada Expo Go

Abra su camara y capture el codigo QR que aparece en la terminal cuando el proyecto este ejecutandose.

## Añadir un Router a la aplicación

Utilizaremos React Navigation, para mas información visite la documentación: https://reactnavigation.org/docs/getting-started/

Se necesitaran las siguientes dependencias:

```bash
npm install @react-navigation/native
```

En nuestro caso como estaremos utilizando expo, necesitamos instalar las siguientes dependencias complementarias de la siguiente forma:

```bash
npx expo install react-native-screens react-native-safe-area-context
```

En el punto de entrada de nuestra aplicación que es <strong>App.js</strong> usaremos el <strong>NavigationContainer</strong>

```react
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```

De esta forma envolvemos toda nuestra aplicación.

Por ultimo necesitamos otra dependencia que nos ayudara en el router de nuestra app que es la siguiente:

```bash
npm install @react-navigation/native-stack
```

Podemos declarar una constante:

```code
const Stack = createNativeStackNavigator();
```

Esto devuelve 2 objetos que son el Navigation y Screen, con ellos podemos declarar las rutas de nuestra app y el componente a renderizar de la siguiente forma:

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

Cree una cuenta en https://newsapi.org/ el cual le otorgara un token para poder usar el servicio.

Por motivos de seguridad y buenas practicas comience guardando este token en una variable de entorno.

En la ruta raiz del proyecto cree un archivo <strong>.env</strong> y guarde el token de la siguiente forma:

```code
NEWS_API_KEY=your_api_key
```

## Variables de entorno

Para acceder a las variables de entorno se debera instalar dotenv y expo-constants de la siguiente forma:

```bash
npm install dotenv expo-constants
```

Cree un archivo en la raiz del proyecto llamado <strong>app.config.js</strong>

Dentro debera incluir esta configuración:

```code
import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
});
```

Por ultimo asegurese de agregar el .env en el archivo .gitignore para no subir el token a algun repositorio de github.

## Consumo de la API

Cree una carpeta llamada <strong>services</strong> con el archivo <strong>api.js</strong>

En la siguiente funcion hacemos una llamada a una url con el token para obtener las noticias:

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

Esta recibira como props los <strong>articles</strong> de todas las noticias, la cual debera renderizar:

<ul>
  <li>Image</li>
  <li>Title</li>
  <li>Description</li>
  <li>Button</li>
</ul>

La construccion del componente es la siguiente:

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

En el json hay algunos articulos que no contienen imagen, para esto hice una ternaria para que en el caso de que la imagen tenga un valor null, en cambio ponga una imagen descargada de internet con una leyenda que dice <strong>no photo</strong>

Tambien recibe esta Card el objeto navigation para poder ir a la pantalla de Detalles, y a su vez le mandamos el objeto article.

## Renderizar una Lista de Articulos

Primero obtenemos la lista de articulos desde la API de la siguiente manera.

```code
  const [data, setData] = useState({});
  useEffect(() => {
    getNews()
      .then((response) => setData(response))
      .catch((error) => console.error(error));
  }, []);

  const { articles } = data;
```

Para que el rendimiento de la aplicación sea bueno, se usara FlatList ya que nos permite renderizar una lista con scroll.

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

Por ultimo en la pantalla de detalles nos hace falta presentar:

<ul>
  <li>Image</li>
  <li>Title</li>
  <li>Source</li>
  <li>Date</li>
  <li>Content</li>
  <li>Link</li>
</ul>

En la response de la api, la propiedad content no presenta toda la información en texto, por lo que se le agregara un link que lleve a la web para poder visualizar la noticia completa.

Recuerde que recibimos como prop en la ruta de detalles el objeto article por lo tanto podemos recuperarlo de la siguiente manera:

```code
const Details = ({ route }) => {
  const { article } = route.params;
}
```

En esta parte cree una función que nos permita abrir la url en el navegador del dispositivo para visitar fuente de la noticia.

```code
  const openUrl = () => {
    Linking.openURL(url);
  };
```

Se puede dar formato a la fecha de publicación de la siguiente forma:

```code
const formatedDate = new Date(publishedAt).toLocaleDateString();
```

Por ultimo presentamos la siguiente información de la siguiente forma:

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

Expo nos permite hacer una pre-Build de nuestra app para ios/android ejecute el siguiente comando:

```bash

```

