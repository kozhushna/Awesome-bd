import React from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';
import UploadFoto from '../Icons/UploadFoto.png';

const LoadImageButton = ({ onButtonClick }) => {
  return (
    <Pressable
      style={styles.button}
      title="Press Me"
      onPress={onButtonClick}
      color="white"
    >
      <View style={styles.container}>
        <Image source={UploadFoto} />
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
    borderColor: '#FF6C00',
    zIndex: 105,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadImageButton;
