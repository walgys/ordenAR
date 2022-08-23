import { signOut } from 'firebase/auth';
import React, {useContext} from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import {Badge, Icon} from 'react-native-elements'
import { auth } from '../config/fb';
import { SignInContext } from '../contexts/authContext';
import { CartContext } from '../contexts/ecommerceContext';
import { colors, parameters } from '../global/styles'
import { actions } from '../reducers/authReducers';


export default function HomeHeader({quantity, navigation}) {
    const {dispatchSignedIn} = useContext(SignInContext);
    const { cart } = useContext(CartContext);
  return (
    <View style={styles.header}>
        <Pressable onPress={()=>{
                    signOut(auth);
                    dispatchSignedIn({type: actions.UPDATE_SIGN_IN, payload: {userToken: null}});
                }}>
            <Icon 
                type='material-community'
                name='logout'
                size={35}
                color={colors.cardBackground}
            />
        </Pressable>

        <View style={{alignItems: 'center', justifyContent: 'center', flex:2}}>
            <Text style={{color: colors.cardBackground, fontSize: 25, fontWeight: 'bold'}}>ordenAR</Text>
        </View>

        <Pressable onPress={()=>navigation.navigate('CheckoutScreen')}>
            <Icon 
                type='material-community'
                name='cart'
                size={35}
                color={colors.cardBackground}
            />
            <Badge
                containerStyle={{position: 'absolute', top:-10, right:-10}}
                badgeStyle={{width:30, height:30, borderRadius:15, backgroundColor: '#D62246'}}
                value={quantity}
            />
        </Pressable>
    </View>

  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: colors.buttons,
        height: parameters.headerHeight,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingBottom: 5
    }
})

