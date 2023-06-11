import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CloseImageButton = () => {
  return (
    <Pressable
      style={styles.button}
      title="Press Me"
      onPress={() => console.log('Button pressed!')}
      color="white"
    >
      <View style={styles.container}>
        <AntDesign name="close" size={13} color="#BDBDBD" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 91,
    left: 120,
    transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
    borderRadius: 12.5,
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
    borderColor: '#BDBDBD',
    zIndex: 105,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CloseImageButton;
