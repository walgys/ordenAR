import { NavigationContainer } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import { auth } from '../config/fb'
import { SignInContext } from '../contexts/authContext'
import { updateCreateAccount } from '../global/data'
import { actions } from '../reducers/authReducers'
import AuthStack from './AuthNavigator'
import ClientNavigator from './ClientNavigator'



export default function RootNavigator() {
  const {signedIn} = useContext(SignInContext)
  const { dispatchSignedIn } = useContext(SignInContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {     
      if(user){
        updateCreateAccount(user, {userId: user?.uid, name: user?.displayName, email: user?.email, photoUrl: user?.photoURL});
        dispatchSignedIn({
          type: actions.UPDATE_SIGN_IN,
          payload: { userToken: 'signed-in', user },
        });
      } else {
        dispatchSignedIn({
          type: actions.UPDATE_SIGN_IN,
          payload: { userToken: null },
        });
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {
        signedIn.userToken !== 'signed-in' ? (<AuthStack />) : (<ClientNavigator/>)
      }
        
    </NavigationContainer>
  )
}

