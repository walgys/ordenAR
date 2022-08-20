import * as React from 'react';
import * as RN from 'react-native';

function Add() {
  return (
    <RN.View style={styles.container}>
      <RN.Text>Add</RN.Text>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default Add;
