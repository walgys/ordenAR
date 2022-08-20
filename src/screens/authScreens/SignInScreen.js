import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import Header from '../../components/Header';
import { colors, parameters, title } from '../../global/styles';
import * as Animatable from 'react-native-animatable';
import { Icon, Button, Divider, SocialIcon } from 'react-native-elements';

export default function SignInScreen({navigation}) {
  const [textInput2Focussed, setTextInput2Focussed] = useState(false);
  const textInput1 = useRef(1);
  const textInput2 = useRef(2);
  return (
    <View style={styles.container}>
      <Header title="MI CUENTA" iconType="arrow-left" navigation = {navigation}/>
      <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text style={title}>Ingrese</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={styles.text1}>Por favor ingrese email y contraseña</Text>
      </View>

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
            style={{fontSize: 20, width: '80%', marginLeft: 10}}
            placeholder="Email"
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
            style={{ fontSize: 20, width: '80%' }}
            onFocus = {()=>setTextInput2Focussed(false)}
            onBlur = {()=>setTextInput2Focussed(true)}
          />
          <Animatable.View animation={textInput2Focussed ? '' : 'fadeIn'} duration={1000}>
            <Icon
              name="visibility-off"
              iconStyle={{ color: colors.grey3 }}
              type="material"
              onPress={()=>{}}
            />
          </Animatable.View>
        </View>
        
      </View>
      <View style={{marginHorizontal: 20, marginVertical: 5}}>
            <Button title='Ingresar' buttonStyle={parameters.styledButton} />
        </View>
        <View style={{margin: 20, alignItems: 'center'}}>
            <Text style={{...styles.text1, textDecorationLine:"underline"}}>¿ Olvidó su contraseña ?</Text>
        </View>

        <View style={{margin: 10, alignItems: 'center'}}>
            <Divider style={{width:"90%"}}/>
        </View>

        <View style={{marginHorizontal: 20, marginVertical: 5}}>
            <SocialIcon
            title='Ingrese con Facebook'
            button
            type='facebook'
            style={styles.socialIcon}
            onPress={()=>{}}
            />
        </View >
        <View style={{marginHorizontal: 20, marginVertical: 5}}>
            <SocialIcon
            title='Ingrese con Google'
            button
            type='google'
            style={styles.socialIcon}
            onPress={()=>{}}
            />
        </View>
        <View style={{ marginVertical: 10, marginLeft: 20 }}>
        <Text style={styles.text1}>¿ Nuevo en ordenAR ?</Text>
      </View>

        <View style={{alignItems: 'flex-end', marginHorizontal: 30}}>
            <Button 
                title = 'Regístrese'
                buttonStyle = {styles.createButton}
                titleStyle = {styles.createButtonTitle}
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
  socialIcon:{
    borderRadius: 12,
    height: 50
  },
  createButton: {
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff8c52',
    height: 60,
    paddingHorizontal: 20
  },
  createButtonTitle:{
    color: '#ff8c52',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3
  }
});