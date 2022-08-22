import { NavigationContainer } from '@react-navigation/native'
import React, { useContext } from 'react'
import { SignInContext } from '../contexts/authContext'
import AuthStack from './AuthNavigator'
import ClientNavigator from './ClientNavigator'



export default function RootNavigator() {
  const {signedIn} = useContext(SignInContext)
  return (
    <NavigationContainer>
      {
        signedIn.userToken !== 'signed-in' ? (<AuthStack />) : (<ClientNavigator/>)
      }
        
    </NavigationContainer>
  )
}

