import React from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { Icon } from "react-native-elements";
import { colors, parameters } from "../global/styles";

export default function Header({title,iconType, navigation}){
    return (
        <View style={styles.header}>
            <View style={{marginLeft: 20}}>
                <Icon
                type="material-community"
                name={iconType}
                color={colors.headerText}
                size = {28}
                onPress={()=>navigation.goBack()} />
                
            </View>
            <View>
                    <Text style={styles.headerText}>{title}</Text>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: parameters.headerHeight,
        backgroundColor: colors.buttons,
        alignItems: 'center'
    },
    headerText: {
        color: colors.headerText,
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 30
    }
})