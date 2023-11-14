import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tarefas from './src/paginas/Tarefas';
import DetalhesTarefa from './src/paginas/DetalhesTarefa';
import NovaTarefa from './src/paginas/NovaTarefa';
import NovoUsuario from './src/paginas/NovoUsuario';
import Login from './src/paginas/Login';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login"
          component={Login}
          options={{headerShown: false}}
          //options={{headerTintColor: "#1A42F0"}}
        />
        <Stack.Screen 
          name="Novo usuario"
          component={NovoUsuario}
          options={{headerShown: false}}
          //options={{headerTintColor: "#1A42F0"}}
        />
        <Stack.Screen 
          name="Tarefas"
          component={Tarefas}
          options={{
            headerTintColor: "#1A42F0",
            headerLeft: null
          }}
        />
        <Stack.Screen 
          name="Detalhes da Tarefa"
          component={DetalhesTarefa}
          options={{headerTintColor: "#1A42F0"}}
        />
        <Stack.Screen 
          name="Nova Tarefa"
          component={NovaTarefa}
          options={{headerTintColor: "#1A42F0"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

