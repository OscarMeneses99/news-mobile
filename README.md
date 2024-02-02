# Documentación

Para esta prueba decidi hacerla en el entorno de desarrollo de expo ya que simplifica el desarrollo de aplicaciones móviles con React Native.

## Creación del proyecto

Ejecute el siguiente comando en su terminal:

```bash
npx create-expo-app
```

Segun las instrucciones, se debera llamar al proyecto <strong>news-mobile</strong>

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



