import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import WishlistProductsScreen from './screens/WishlistProductsScreen';
import './App.css'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ProductList" component={ProductListScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ProductPage" component={ProductScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="WishlistProducts" component={WishlistProductsScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
