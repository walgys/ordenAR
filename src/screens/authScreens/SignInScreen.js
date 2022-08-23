import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import Header from '../../components/Header';
import { colors, parameters, title } from '../../global/styles';
import * as Animatable from 'react-native-animatable';
import { Icon, Button, Divider, SocialIcon } from 'react-native-elements';
import { Formik } from 'formik';
import { auth } from '../../config/fb';
import {
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';
import { Alert } from 'react-native';
import { SignInContext } from '../../contexts/authContext';
import { actions } from '../../reducers/authReducers';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { updateCreateAccount } from '../../global/data';

export default function SignInScreen({ navigation }) {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const textInput1 = useRef(1);
  const textInput2 = useRef(2);
  const { dispatchSignedIn } = useContext(SignInContext);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Constants.manifest.extra.webClientId,
    androidClientId: Constants.manifest.extra.androidClientId,
  });

  WebBrowser.maybeCompleteAuthSession();

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      auth.onAuthStateChanged((user) => {
        console.log('signin')
        if(user){
          updateCreateAccount(user, {userId: user.uid, name: user.displayName, email: user.email, photoUrl: user.photoUrl});
          dispatchSignedIn({
            type: actions.UPDATE_SIGN_IN,
            payload: { userToken: 'signed-in' },
          });
        }
      });
    }
  }, [response]);

  async function signIn(data) {
    const { userName, password } = data;
    try {
      const user = await signInWithEmailAndPassword(auth, userName, password);
      if (user) {
        updateCreateAccount(user, {userId: user.uid});
        dispatchSignedIn({
          type: actions.UPDATE_SIGN_IN,
          payload: { userToken: 'signed-in' },
        });
      }
    } catch (err) {
      Alert.alert(err.name, err.message);
    }
  }
  return (
    <View style={styles.container}>
      <Header title="MI CUENTA" iconType="arrow-left" navigation={navigation} />
      <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text style={title}>Ingrese</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={styles.text1}>Por favor ingrese email y contraseña</Text>
      </View>
      <Formik
        initialValues={{ userName: '', password: '' }}
        onSubmit={(values) => {
          signIn(values);
        }}
      >
        {(props) => (
          <View>
            <View style={{ marginTop: 20 }}>
              <View style={styles.textInput1}>
                <View>
                  <Icon
                    name="email"
                    iconStyle={{ color: colors.grey3 }}
                    type="material"
                  />
                </View>
                <TextInput
                  ref={textInput1}
                  style={{ fontSize: 20, width: '80%', marginLeft: 10 }}
                  placeholder="Email"
                  onChangeText={props.handleChange('userName')}
                  value={props.values.userName}
                />
              </View>
              <View style={styles.textInput2}>
                <View>
                  <Icon
                    name="lock"
                    iconStyle={{ color: colors.grey3 }}
                    type="material"
                  />
                </View>

                <TextInput
                  ref={textInput2}
                  placeholder="Contraseña"
                  secureTextEntry={hiddenPassword}
                  style={{ fontSize: 20, width: '80%' }}
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                />
                <View>
                  <Icon
                    name="visibility-off"
                    iconStyle={{ color: colors.grey3 }}
                    type="material"
                    onPress={() => setHiddenPassword(true)}
                    onPressIn={() => setHiddenPassword(false)}
                  />
                </View>
              </View>
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Button
                title="Ingresar"
                buttonStyle={parameters.styledButton}
                onPress={() => props.handleSubmit()}
              />
            </View>
          </View>
        )}
      </Formik>
      <View style={{ margin: 20, alignItems: 'center' }}>
        <Text style={{ ...styles.text1, textDecorationLine: 'underline' }}>
          ¿ Olvidó su contraseña ?
        </Text>
      </View>

      <View style={{ margin: 10, alignItems: 'center' }}>
        <Divider style={{ width: '90%' }} />
      </View>
      <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
        <SocialIcon
          title="Ingrese con Google"
          button
          type="google"
          style={styles.socialIcon}
          onPress={() => promptAsync({ useProxy: true })}
        />
      </View>
      <View style={{ marginVertical: 10, marginLeft: 20 }}>
        <Text style={styles.text1}>¿ Nuevo en ordenAR ?</Text>
      </View>

      <View style={{ alignItems: 'flex-end', marginHorizontal: 30 }}>
        <Button
          title="Regístrese"
          buttonStyle={styles.createButton}
          titleStyle={styles.createButtonTitle}
          onPress={() => navigation.navigate('SignUpScreen')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text1: {
    color: colors.grey3,
    fontSize: 16,
  },
  textInput1: {
    borderWidth: 1,
    borderColor: '#86939e',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    padding: 10,
    fontSize: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput2: {
    borderWidth: 1,
    borderColor: '#86939e',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  socialIcon: {
    borderRadius: 12,
    height: 50,
  },
  createButton: {
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff8c52',
    height: 60,
    paddingHorizontal: 20,
  },
  createButtonTitle: {
    color: '#ff8c52',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
});
