import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import * as RN from 'react-native';

function Home() {
  const navigation = useNavigation();  
  return <>
  <RN.Text>Home</RN.Text>
  <RN.Button title='Agregar Producto' onPress={() => navigation.navigate('Add')} />
  </>
}

export default Home;
