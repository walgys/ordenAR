import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import HomeHeader from '../components/HomeHeader';
import { SignInContext } from '../contexts/authContext';
import { CartContext } from '../contexts/ecommerceContext';
import { purchaseCart } from '../global/data';
import { colors, parameters } from '../global/styles';
import { actions } from '../reducers/ecommerceReducers';
import { actions as ordersActions} from '../reducers/ordersReducer'

export default function CheckoutScreen({ navigation }) {
  const { dispatchCart, cart, dispatchRefreshOrders } = useContext(CartContext);
  const [outOfStock, setOutOfStock] = useState([]);
  const { signedIn } = useContext(SignInContext);
  const sendCart = async (user, cart) => {
    const result = await purchaseCart(user, cart);
    if (result.result == 'ok') dispatchCart({
      type: actions.EMPTY_CART
    })
    if (result.result == 'empty') console.log('empty cart');
    if (result.result == 'outOfStock') {
      setOutOfStock(result.outOfStock);
    }
    dispatchRefreshOrders({type: ordersActions.REFRESH_ORDERS});
  };
  return (
    <View>
      <HomeHeader quantity={cart.totalItems} navigation={navigation} />
      <View style={{ justifyContent: 'space-between', height: '90%' }}>
        <View style={{}}>
          {cart.products.map((product) => {
            const foundOutOfStock = outOfStock.find(prod=>prod.id === product.productId)
            const isOutOfStock = foundOutOfStock?.available < product?.quantity ? true : false;
            console.log(foundOutOfStock)
            return (
              <View
                key={product.productId}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginHorizontal: 10,
                  marginVertical: 5,
                  paddingVertical: 5,
                  borderRadius: 10,
                  backgroundColor: isOutOfStock ? 'red' : colors.headerText
                }}
              >
                <View style={{ flex: 0.3 }}>
                  <Text>{`${product.quantity}x`}</Text>
                </View>
                <View style={{ flex: 3 }}>
                  <Text>{product.name}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text>{`$${product.price}`}</Text>
                </View>
                <View>
                  <Text>{`$${product.price * product.quantity}`}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              margin: 10,
            }}
          >
            <View style={{ marginHorizontal: 20 }}>
              <Text>Total</Text>
            </View>
            <View>
              <Text>{`$${cart.totalPrice}`}</Text>
            </View>
          </View>
          <Button
            title="Confirmar"
            buttonStyle={parameters.styledButton}
            onPress={() => sendCart(signedIn.user, cart)}
          />
        </View>
      </View>
    </View>
  );
}
