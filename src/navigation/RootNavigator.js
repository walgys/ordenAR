import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import AuthStack from './AuthNavigator'



export default function RootNavigator() {
  return (
    <NavigationContainer>
        <AuthStack />
    </NavigationContainer>
  )
}

