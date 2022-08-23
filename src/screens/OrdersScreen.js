import React, {useContext} from 'react'
import { View } from 'react-native'
import HomeHeader from '../components/HomeHeader'
import { CartContext } from '../contexts/ecommerceContext';

export default function OrdersScreen({navigation}) {
  const { cart } = useContext(CartContext);
  return (
    <View>
      <HomeHeader quantity={cart.totalItems} navigation={navigation}/>
    </View>
  )
}

