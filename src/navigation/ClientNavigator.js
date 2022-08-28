import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { Icon } from 'react-native-elements';
import { colors } from '../global/styles';
import AccountScreen from '../screens/AccountScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import { CartContext } from '../contexts/ecommerceContext';
import { actions } from '../reducers/ordersReducer';
import { SignInContext } from '../contexts/authContext';

const ClientTabs = createBottomTabNavigator();

export default function ClientNavigator() {
  return (
    <ClientTabs.Navigator
    screenOptions={{
      "tabBarActiveTintColor": "#ff8c52",
      "tabBarStyle": [
        {
          "display": "flex"
        },
        null
      ]
    }}
    >
      <ClientTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" size={size} color={color} />
          ),
        }}
      />
      <ClientTabs.Screen
        name="OrdersScreen"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Pedidos',
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-list" type="material" size={size} color={color} />
          ),
        }}
      />   
      <ClientTabs.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Checkout',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart" type="material-community" size={size} color={color} />
          ),
        }}
      />
    </ClientTabs.Navigator>
  );
}
