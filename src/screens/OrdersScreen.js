import React, { useContext, useEffect, useState } from 'react';
import { View} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import HomeHeader from '../components/HomeHeader';
import { SignInContext } from '../contexts/authContext';
import { CartContext } from '../contexts/ecommerceContext';
import { getOrders } from '../global/data';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';


const OrderComponent = ({order, index}) => {
const [expanded, setExpanded] = useState(false)

  return (
  <ListItem.Accordion
  key={'accordion-'+index+order.id}
    content={
      <>
        <Icon name="receipt" size={30} />
        <ListItem.Content key={'listItem-Accordion-'+index+order.id} style={{marginHorizontal: 5}}>
          <ListItem.Title>{`${moment(order.timestamp).format('DD/MM/YYYY HH:MM:SS')}`}</ListItem.Title>
        </ListItem.Content>
      </>
    }
    isExpanded={expanded}
    onPress={() => {
      setExpanded(!expanded);
    }}
  >
<ListItem key={'listItem-'+index+order.id}>
  <ListItem.Content>
    <ListItem.Title  >{`Orden ${order.id} `}</ListItem.Title>
    <ListItem.Subtitle>{`Items totales: ${order.totalItems}`}</ListItem.Subtitle>
  </ListItem.Content>
 </ListItem>
{order.products.map((product, index) => (
<ListItem key={'listItem-'+index+product.id} bottomDivider>
  <ListItem.Content key={'listItem-content-'+index+product.id} bottomDivider>
    <ListItem.Title key={'listItem-title-'+index+product.id} bottomDivider>{`${product.name}`}</ListItem.Title>
    <ListItem.Subtitle key={'listItem-sub-'+index+product.id} bottomDivider>{`${product.quantity}x $${product.price} = $${product.quantity * product.price}`}</ListItem.Subtitle>
  </ListItem.Content>
  <ListItem.Chevron />
</ListItem>
))}
 <ListItem key={'listItem-totalPrice-'+order.id}>
  <ListItem.Content right key={'listItem-totalPrice-content-'+order.id}>
    <ListItem.Title key={'listItem-totalPrice-title'+order.id}>{`Total: $${order.totalPrice}`}</ListItem.Title>
  </ListItem.Content>
 </ListItem>
  </ListItem.Accordion>)
}

export default function OrdersScreen({ navigation }) {
  const { cart } = useContext(CartContext);
  const { signedIn } = useContext(SignInContext);
  const [orders, setOrders] = useState([]);
 

  useEffect(() => {

    getOrders(signedIn.user).then(
      orders => {
        setOrders(orders)
      }
    );
  }, []);

  return (
    <View>
      <HomeHeader quantity={cart.totalItems} navigation={navigation} />
      <ScrollView>
        {orders.map((order, index)=>(
        <OrderComponent key={'container-'+order.id} index={index} order={order} />
      ))
      }
      </ScrollView>
    </View>
  );
}
