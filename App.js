import * as React from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';
import { colors } from './src/global/styles';
import RootNavigator from './src/navigation/RootNavigator';

import SignInScreen from './src/screens/authScreens/SignInScreen';

function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.statusBar}
      />
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
