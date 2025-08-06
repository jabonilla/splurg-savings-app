import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Logo = ({ size = 160 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image 
        source={require('../../../assets/isotipo.png')} 
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Logo; 