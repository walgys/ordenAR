import * as React from 'react';
import {  StyleSheet, View, StatusBar } from 'react-native';
import { SignInContextProvider } from './src/contexts/authContext';
import { CartContextProvider } from './src/contexts/ecommerceContext';
import { colors } from './src/global/styles';
import RootNavigator from './src/navigation/RootNavigator';
import Constants from "expo-constants";
function App() {
  Constants.manifest.originalFullName = "@walgys/ordenar";
  return (
    <SignInContextProvider>
      <CartContextProvider>
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.statusBar}
          />
          <RootNavigator />
        </View>
      </CartContextProvider>
    </SignInContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
