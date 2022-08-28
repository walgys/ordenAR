import React,{useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/styles';
import HomeHeader from '../components/HomeHeader'
import { CartContext } from '../contexts/ecommerceContext';
import { getOrders } from '../global/data';


export default function AccountScreen({navigation}) {
  const { cart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    alert('ask orders');
    getOrders().then(
      orders => {
        alert('return orders');
        setOrders(orders)
      }
    );
  }, []);

  return (
    <View>
      <HomeHeader quantity={cart.totalItems} navigation={navigation}/>
      <View>
        <Text>{JSON.stringify(orders)}</Text>
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
