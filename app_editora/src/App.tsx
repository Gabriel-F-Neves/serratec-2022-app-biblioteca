import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Importando o provedor de contexto do DataContext
import { DataProvider } from "./context/DataContext";


//navigation.navigate('Details')


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={Home}
            options={{
              headerStyle: {backgroundColor: '#7054b6'},
              headerTitleAlign: 'center'            
            }} />
          <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;
