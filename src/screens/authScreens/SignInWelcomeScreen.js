import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { colors, parameters, title } from '../../global/styles';
import { Icon, Button, Divider, SocialIcon } from 'react-native-elements';
import { SignInContext } from '../../contexts/authContext';
import { actions } from '../../reducers/authReducers';
import { auth } from '../../config/fb';

export default function SignInWelcomeScreen({ navigation }) {
  const { dispatchSignedIn } = useContext(SignInContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(JSON.stringify(user));
      if (user) {
        dispatchSignedIn({
          type: actions.UPDATE_SIGN_IN,
          payload: { userToken: 'signed-in' },
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
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 20,
        }}
      >
        <Text
          style={{ fontSize: 26, color: colors.buttons, fontWeight: 'bold' }}
        >
          SU PEDIDO A SU CASA
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Button
            title="Ingresar"
            buttonStyle={parameters.styledButton}
            titleStyle={parameters.buttonTitle}
            onPress={() => navigation.navigate('SignInScreen')}
          />
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Button
            title="Regístrese"
            buttonStyle={styles.createButton}
            titleStyle={styles.createButtonTitle}
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </View>
      </View>
    </View>
  );
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
    width: '100%',
  },
  createButtonTitle: {
    color: colors.grey1,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
});
