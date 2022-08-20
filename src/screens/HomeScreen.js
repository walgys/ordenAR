import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import HomeHeader from '../components/HomeHeader';
import React, { useState } from 'react';
import { filterData, products } from '../global/data';
import { colors } from '../global/styles';
import { Icon } from 'react-native-elements/dist/icons/Icon';

export default function HomeScreen() {
  const [categoryIndex, setCategoryIndex] = useState('0');
  return (
    <View style={styles.container}>
      <HomeHeader />
      
        <View style={{backgroundColor: colors.grey2, padding:10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Categorías</Text>
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
                    style={{ height: 70, width: 70, borderRadius: 35 }}
                    source={item.image}
                  />
                  <View>
                    <Text style={categoryIndex === item.id ? {...styles.smallCardText} : {...styles.smallCardSelectedText}}>{item.name}</Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
          <View style={{backgroundColor: colors.grey2, padding:10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Productos</Text>
        </View>
        </View>
        <ScrollView style={{paddingHorizontal: 10}}>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={products.filter(product=>product.categoryId === categoryIndex)}
            keyExtractor={(item) => item.id}
            extraData={categoryIndex}
            renderItem={({ item, index }) => (
              
                <View
                  style={styles.productCard}
                >
                  <View style={styles.productTitle}>
                    <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                  </View>
                  <Image
                    style={{height: '100%', width: '100%', objectFit: 'contain'}}
                    source={item.image}
                  />
                  <View style={styles.productCommands}>

                    <View>
                    <Icon 
                      type='material-community'
                      name='minus'
                    />
                    </View>

                    <View>
                      <Text>{0}</Text>
                    </View>

                    <View>
                    <Icon 
                      type='material-community'
                      name='plus'
                    />
                    </View>
                    

                  </View>
                   
                </View>
              
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smallCard: {
    borderRadius: 30,
    backgroundColor: colors.grey4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 110,
    margin: 10,
    height: 110,
  },
  smallCardSelected: {
    borderRadius: 30,
    backgroundColor: colors.buttons,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 110,
    margin: 10,
    height: 110,
  },
  smallCardText:{
    color: colors.cardBackground,
    fontWeight: 'bold'
  },
  smallCardSelectedText:{
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
