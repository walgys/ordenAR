import React,{useContext} from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements';
import { auth } from '../config/fb';
import { colors } from '../global/styles';
import HomeHeader from '../components/HomeHeader'
import { CartContext } from '../contexts/ecommerceContext';


export default function AccountScreen({navigation}) {
  const { cart } = useContext(CartContext);
  return (
    <View>
      <HomeHeader quantity={cart.totalItems} navigation={navigation}/>
      <View>
      </View>
        
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
