import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import HomeHeader from '../components/HomeHeader';
import React, { useState, useEffect, useContext } from 'react';
import { filterData, getProducts } from '../global/data';
import { colors } from '../global/styles';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { CartContext } from '../contexts/ecommerceContext';
import { actions } from '../reducers/ecommerceReducers';


export default function HomeScreen({navigation}) {
  const [categoryIndex, setCategoryIndex] = useState('0');
  const { dispatchCart, cart } = useContext(CartContext);
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([])
  
  useEffect(() => {
    getProducts().then(products=>setProducts(products));
  }, [])

  useEffect(() => {
    if(products)
    setFilteredProducts(products.filter(product=>product.categoryId === categoryIndex))
  }, [categoryIndex, products])
  
  
  return (
    <View style={styles.container}>
      <HomeHeader quantity={cart.totalItems} navigation={navigation}/>
      
        <View style={{backgroundColor: colors.grey2, padding:5}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Categorías</Text>
        </View>

        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filterData}
            keyExtractor={(item) => item.id}
            extraData={categoryIndex}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => setCategoryIndex(item.id)}>
                <View
                  style={
                    categoryIndex === item.id
                      ? { ...styles.smallCardSelected }
                      : { ...styles.smallCard }
                  }
                >
                  <Image
                    style={{ height: 60, width: 60, borderRadius: 30 }}
                    source={item.image}
                  />
                  <View>
                    <Text style={categoryIndex === item.id ? {...styles.smallCardText} : {...styles.smallCardSelectedText}}>{item.name}</Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
          <View style={{backgroundColor: colors.grey2, padding:5}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Productos</Text>
        </View>
        </View>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={{paddingHorizontal: 10}}
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            extraData={categoryIndex}
            renderItem={({ item, index }) => {
                const foundItem = cart.products.find((product)=>product.productId === item.id);
                const itemQuantity = foundItem ? foundItem.quantity : 0;
              return (
              
                <View
                  style={styles.productCard}
                >
                  <View style={styles.productTitle}>
                    <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                  </View>
                  <Image
                    style={{height: '100%', width: '100%', objectFit: 'contain'}}
                    source={{uri: item.image}}
                  />
                  <View style={styles.productCommands}>

                    <View>
                    <Icon 
                      type='material-community'
                      name='minus'
                      onPress={()=>dispatchCart({
                        type: actions.REMOVE_FROM_CART,
                        payload: { productId: item.id, quantity: 1 },
                      })}
                    />
                    </View>

                    <View>
                      <Text>{itemQuantity}</Text>
                    </View>

                    <View>
                    <Icon 
                      type='material-community'
                      name='plus'
                      onPress={()=>dispatchCart({
                        type: actions.ADD_TO_CART,
                        payload: { productId: item.id, quantity: 1, name: item.name, price: item.price },
                      })}
                    />
                    </View>
                    

                  </View>
                   
                </View>
              
            )}
          }
          />
        </View>
      <View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smallCard: {
    borderRadius: 20,
    backgroundColor: colors.grey4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 90,
    margin: 10,
    height: 100,
  },
  smallCardSelected: {
    borderRadius: 20,
    backgroundColor: colors.buttons,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 90,
    margin: 10,
    height: 100,
  },
  smallCardText:{
    fontSize: 12,
    color: colors.cardBackground,
    fontWeight: 'bold'
  },
  smallCardSelectedText:{
    fontSize: 12,
    color: colors.grey1,
    fontWeight: 'bold'
  },
  productCard: {
    width: '100%',
    height: 250,
    backgroundColor: colors.cardBackground,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden'
  },
  productTitle:{
    padding: 10,  
    height: 40,
    backgroundColor: colors.grey2
  },
  productCommands:{
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    borderRadius: 20,
    width: 150,
    height: 50,
    bottom: 20,
    right: 20,
    backgroundColor: colors.cardBackground
  }
});
