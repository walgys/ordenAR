import React,{useContext} from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { signOut} from 'firebase/auth';
import { auth } from '../config/fb';
import { colors } from '../global/styles';
import { SignInContext } from '../contexts/authContext';
import { actions } from '../reducers/authReducers';

export default function AccountScreen() {
    const {dispatchSignedIn} = useContext(SignInContext);
  return (
    <View>
        <Button 
                title = 'Desloguearse'
                buttonStyle = {styles.createButton}
                titleStyle = {styles.createButtonTitle}
                onPress={()=>{
                    signOut(auth);
                    dispatchSignedIn({type: actions.UPDATE_SIGN_IN, payload: {userToken: null}});
                }
                }
            />
    </View>
  )
}


const styles = StyleSheet.create({
    createButton: {
      backgroundColor: 'white',
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.grey1,
      height: 50,
      width: '100%'
    },
    createButtonTitle:{
      color: colors.grey1,
      fontSize: 20,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -3
    }
  });
