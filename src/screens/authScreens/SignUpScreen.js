import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { colors, parameters } from '../../global/styles';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { Button, Icon } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/fb';
import { Alert } from 'react-native';
import { updateCreateAccount } from '../../global/data';
import { SignInContext } from '../../contexts/authContext';

export default function SignUpScreen({ navigation }) {
  const { dispatchSignedIn } = useContext(SignInContext);
  const initualValues = {
    phone: '',
    name: '',
    email: '',
    password: '',
  };
  const signUp = async (values) => {
    const {email, password, phone, name} = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      auth.onAuthStateChanged((user) => {
        if(user){
          console.log(JSON.stringify({userId: user.uid, email:email, name:name, phone: phone}))
          updateCreateAccount(user, {userId: user.uid, email:email, name:name, phone: phone});
        }
      });
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        Alert.alert('El email ya fué registrado');
      }
      if (err.code === 'auth/email-invalid') {
        Alert.alert('El email es inválido');
      }
    }
  };
  const [hiddenPassword, setHiddenPassword] = useState(true);
  return (
    <View>
      <Header title="MI CUENTA" iconType="arrow-left" navigation={navigation} />
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <View style={{ paddingLeft: 15 }}>
          <Text style={styles.text1}>Regístrese</Text>
        </View>
        <Formik
          initialValues={initualValues}
          onSubmit={(values) => signUp(values)}
        >
          {(props) => (
            <View>
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontSize: 18, fontStyle: 'italic' }}>
                  ¿ Nuevo en ordenAR ?
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <View></View>
                <View style={{width: '90%'}}>
                  <TextInput
                    
                    placeholder="Teléfono"
                    keyboardType="number-pad"
                    autoFocus={true}
                    onChangeText={props.handleChange('phone')}
                    value={props.values.phone}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={{width: '90%'}}>
                  <TextInput
                  
                    placeholder="Nombre"
                    autoFocus={false}
                    onChangeText={props.handleChange('name')}
                    value={props.values.name}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View>
                  <Icon name="email" type="material-community" />
                </View>
                <View style={{ marginLeft: 5, width: '90%' }}>
                  <TextInput
                    placeholder="Email"
                    autoFocus={false}
                    onChangeText={props.handleChange('email')}
                    value={props.values.email}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View>
                  <Icon name="lock" type="material-community" />
                </View>
                <View style={{ width: '85%', marginLeft: 5 }}>
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={hiddenPassword}
                    autoFocus={false}
                    onChangeText={props.handleChange('password')}
                    value={props.values.password}
                  />
                </View>
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
              <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                <Button
                  title="Registrar"
                  buttonStyle={parameters.styledButton}
                  onPress={() => props.handleSubmit()}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    color: colors.buttons,
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 15,
    borderColor: colors.grey1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
