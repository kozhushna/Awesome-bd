import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoadImageButton from './LoadImageButton';

const AvatarHolder = () => {
  return (
    <View style={styles.fotoWrapper}>
      <View style={styles.imageHolder}></View>
      <LoadImageButton></LoadImageButton>
    </View>
  );
};

const styles = StyleSheet.create({
  fotoWrapper: {
    width: 130,
    height: 130,
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -65 }, { translateY: -65 }],
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageHolder: {
    height: '100%',
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
});

export default AvatarHolder;
