import React,{useContext} from 'react'
import { View, Text } from 'react-native'
import HomeHeader from '../components/HomeHeader';
import { CartContext } from '../contexts/ecommerceContext';


export default function CheckoutScreen({navigation}) {
  const { dispatchCart, cart } = useContext(CartContext);
  console.log(cart);
  return (
    <View>
      <HomeHeader quantity={cart.totalItems} navigation={navigation}/>
        {cart.products.map(product=>(
        <View key={product.productId} style={{flexDirection: 'row'}}>
          <View>
            <Text >
            {product.name}
          </Text>
          </View>
          <View>
            <Text >
            {product.price}
          </Text>
          </View>
        </View>
        ))}
    </View>
  )
}

