import React from "react";
import { StyleSheet, View } from "react-native";

import Login from "./pages/Login";
import Home from "./pages/Home";
import HomeEditoras from "./pages/HomeEditoras";
import HomeEditora from "./pages/HomeEditora";
import Favoritos from "./pages/Favoritos";
import Carrinho from "./pages/Carrinho";
import PaginaLivro from "./pages/PaginaLivro";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Importando o provedor de contexto do DataContext
import { DataProvider } from "./context/DataContext";


const TabBottomNavigation = createBottomTabNavigator();
const BottomNavigator = () => {
  return(
    <TabBottomNavigation.Navigator 
      screenOptions={{
        headerShown:false,
        tabBarStyle:{backgroundColor:'#634193'},
        tabBarLabelStyle:{fontSize: 14},
        tabBarActiveTintColor:'#000',
        tabBarInactiveTintColor:'#000'
      }}
    >
      <TabBottomNavigation.Screen name="HomeTabScreen" component={Home} 
        options={{
          title: 'Home',
          tabBarIcon: () => (<Ionicons name='home' color='#000' size={24} />)
        }}
      />
      <TabBottomNavigation.Screen name="HomeEditorasTabScreen" component={HomeEditoras} 
        options={{
          title: 'Home Editoras',
          tabBarIcon: () => (<Ionicons name='library' color='#000' size={24} />)
        }}
      />
      <TabBottomNavigation.Screen name="FavoritosTabScreen" component={Favoritos} 
        options={{
          title: 'Favoritos',
          tabBarIcon: () => (<Ionicons name='heart' color='#000' size={24} />)
        }}
      />
      <TabBottomNavigation.Screen name="CarrinhoTabScreen" component={Carrinho} 
        options={{
          title: 'Carrinho',
          tabBarIcon: () => (<Ionicons name='cart' color='#000' size={24} />)
        }}
      />
    </TabBottomNavigation.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={Login} />
          <Stack.Screen 
            name="BottomNavigatorScreen" 
            component={BottomNavigator}
            options={{
              headerStyle: {backgroundColor: '#634193'},
              headerTitleAlign: 'center'            
            }}
          />
          <Stack.Screen 
            name="HomeEditoraScreen" 
            component={HomeEditora}
            options={{
              headerStyle: {backgroundColor: '#634193'},
              headerTitleAlign: 'center'            
            }}
          />
          <Stack.Screen 
            name="PaginaLivroScreen" 
            component={PaginaLivro}
            options={{
              headerStyle: {backgroundColor: '#634193'},
              headerTitleAlign: 'center'            
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;
