import React,{useContext} from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements';
import HomeHeader from '../components/HomeHeader';
import { CartContext } from '../contexts/ecommerceContext';
import { parameters } from '../global/styles';


export default function CheckoutScreen({navigation}) {
  const { dispatchCart, cart } = useContext(CartContext);
  console.log(cart);
  return (
    <View>
      <HomeHeader quantity={cart.totalItems} navigation={navigation}/>
      <View style={{justifyContent: 'space-between', height: '90%'}}>
        <View style={{}}>
        {cart.products.map(product=>(
          <View key={product.productId} style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, margin: 10}}>
          <View style={{flex:0.3}}>
            <Text >
            {`${product.quantity}x`}
          </Text>
          </View>
          <View style={{flex:3}}>
            <Text >
            {product.name}
          </Text>
          </View>
          
          <View style={{flex:1}}>
            <Text >
            {`$${product.price}`}
          </Text>
          </View>
          <View >
            <Text >
            {`$${product.price * product.quantity}`}
          </Text>
          </View>
        </View>
        ))}
        </View>
        
        <View style={{paddingHorizontal: 10}}>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 10, margin: 10}}>
          <View style={{marginHorizontal: 20}}>
            <Text>Total</Text>
          </View>
          <View>
          <Text>{`$${cart.totalPrice}`}</Text>
          </View>
        </View>
          <Button
                title="Confirmar"
                buttonStyle={parameters.styledButton}
                onPress={() => console.log('confirmar')}
              />
        </View>
            </View>
    </View>
  )
}

