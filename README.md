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
