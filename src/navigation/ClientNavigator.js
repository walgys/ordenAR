import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import { Icon } from 'react-native-elements';
import { colors } from '../global/styles';
import AccountScreen from '../screens/AccountScreen';
import OrdersScreen from '../screens/OrdersScreen';

const ClientTabs = createBottomTabNavigator();

export default function ClientNavigator() {
  return (
    <ClientTabs.Navigator tabBarOptions={{
        activeTintColor: colors.buttons,
        headerShown: false
    }}>
        <ClientTabs.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => 
                    <Icon
                        name='home'
                        type='material'
                        size={size}
                        color={color}
                    />
                
            }}
            />
            <ClientTabs.Screen
            name='OrdersScreen'
            component={OrdersScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Pedidos',
                tabBarIcon: ({color, size}) => 
                    <Icon
                        name='view-list'
                        type='material'
                        size={size}
                        color={color}
                    />
                
            }}
            />

<ClientTabs.Screen
            name='AccountScreen'
            component={AccountScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Mi Cuenta',
                tabBarIcon: ({color, size}) => 
                    <Icon
                        name='person'
                        type='material'
                        size={size}
                        color={color}
                    />
                
            }}
            />
    </ClientTabs.Navigator>
  )
}

