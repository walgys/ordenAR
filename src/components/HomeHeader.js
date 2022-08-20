import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {Icon, withBadge} from 'react-native-elements'
import { colors, parameters } from '../global/styles'


export default function HomeHeader() {
    const BadgeIcon = withBadge(0)(Icon);
  return (
    <View style={styles.header}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon 
                type='material-community'
                name='menu'
                color= {colors.cardBackground}
                size={32}
            />
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: colors.cardBackground, fontSize: 25, fontWeight: 'bold'}}>ordenAR</Text>
        </View>

        <View>
            <BadgeIcon 
                type='material-community'
                name='cart'
                size={35}
                color={colors.cardBackground}
            />
        </View>
    </View>

  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: colors.buttons,
        height: parameters.headerHeight,
        justifyContent: 'space-between',
        paddingHorizontal: 15
    }
})

